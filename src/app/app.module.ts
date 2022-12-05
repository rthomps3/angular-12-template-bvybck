import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [AppComponent, PostListComponent, PostCreateComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
