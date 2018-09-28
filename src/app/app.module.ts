import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImportModule } from './import.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchLibraryComponent } from './search-library/search-library.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchLibraryComponent
  ],
  imports: [
    BrowserModule,
    ImportModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
