import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  newNote: Note = { title: '', content: '' };
  editMode = false;
  editingNoteId: string | null = null;

  constructor(private noteService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.noteService.getNotes().subscribe(data => this.notes = data);
  }

  onSubmit(): void {
    if (this.editMode && this.editingNoteId) {
      this.noteService.updateNote(this.editingNoteId, this.newNote).subscribe(() => {
        this.resetForm();
        this.loadNotes();
      });
    } else {
      this.noteService.addNote(this.newNote).subscribe(() => {
        this.resetForm();
        this.loadNotes();
      });
    }
  }

  onEdit(note: Note): void {
    this.editMode = true;
    this.editingNoteId = note._id!;
    this.newNote = { title: note.title, content: note.content };
  }

  deleteNote(id: string): void {
    this.noteService.deleteNote(id).subscribe(() => this.loadNotes());
  }

  resetForm(): void {
    this.newNote = { title: '', content: '' };
    this.editMode = false;
    this.editingNoteId = null;
  }
}
