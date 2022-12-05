import { Component, EventEmitter } from '@angular/core';
import { IPosts } from '../posts.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredContent = '';
  enteredTitle = '';
  postCreated = new EventEmitter<IPosts>();

  onAddPost() {
    const posts: IPosts = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.postCreated.emit(posts);
  }
}
