import { Component, Input, OnInit } from '@angular/core';
import { IPosts } from '../posts.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() posts: IPosts[] = [];

  constructor() {}

  ngOnInit() {}
}
