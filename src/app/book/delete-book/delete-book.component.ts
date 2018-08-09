import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {

  @Input() deleteMode;
  @Input() display;
  @Output('closeModalDialog') closeModalDialog = new EventEmitter<string>();
  @Output('deleteBook') deleteBook = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onCloseModalDialog() {
    this.closeModalDialog.emit();
  }

  onDeleteBook() {
    this.deleteBook.emit();
  }
}
