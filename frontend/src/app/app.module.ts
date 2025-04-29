// frontend/src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NotesComponent } from './components/notes/notes.component';  // Ensure correct import
import { NotesService } from './services/notes.service';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent  // Declare NotesComponent here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
