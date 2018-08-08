import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from './../shared/models/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  @Output('clicked') clicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.clicked.emit('j');
  }

}
