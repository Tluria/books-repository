import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { FormGroup, FormControl, Validators }  from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

import { Book } from './../shared/models/book.model';
import { BooksService } from '../shared/services/books.service';
import { ToasterService } from './../shared/services/toaster.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  books: Book[];
  bookForm; 
  display='none'; 
  id: number;
  editMode: boolean;
  deleteMode: boolean;
  isBookExist = false;
  isClosePopUpClicked = false;
  requiredAlert = false;

  constructor(private booksService: BooksService, private route: ActivatedRoute,
              private toastr: ToastsManager, vRef: ViewContainerRef,
              private toaster: ToasterService) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    this.booksService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
    });
    this.initForm();
    this.deleteMode = false;
  }

  openModalDialog(){
    this.display='block'; 
  }

  closeModalDialog(){
    this.display='none'; 
    this.deleteMode = false;
    this.isClosePopUpClicked = true;
    this.requiredAlert = false;
  }

  filterdTitle(title: any) {
    const words = title.split(' ');
    let newWords = [];

    for (let char of words) {
      const c = char.toLowerCase() 
      newWords.push(c.charAt(0).toUpperCase() + c.slice(1));
    }

    return newWords.join(' ').replace(/[^\w\s]/gi, '');
  }

  onSubmit() {
    if(!this.isFieldsEmpty()) {
      this.isExist();
      if(!this.isBookExist) {
        this.addBook(this.bookForm.value);
        this.closeModalDialog();
        this.toaster.showSuccess();
      } else {
          this.isBookExist = false;
          this.toaster.showError();
      }
    } else {
      this.requiredAlert = true;
    }
  }

  isExist() {
    for(let book of this.books) {
      const filterdTitle = this.filterdTitle(book.title);
      if(filterdTitle == this.bookForm.value.title) {
        this.isBookExist = true;
        break;
      }
    }
  }

  onAddNewBook() {
    this.editMode = false;
    this.initForm();
    this.openModalDialog();
  }

  onBookClicked(index: number) {
    this.id = index;
    this.editMode = true;
    this.initForm();
    this.openModalDialog()
  }

  onUpdateBook() {
    this.updateBook(this.id, this.bookForm.value);
  }

  onDeleteClicked() {
    this.deleteMode = true;
    this.openModalDialog();
  }

  deleteBook() {
    this.books.splice(this.id,1);
    this.toaster.showWarning();
    this.closeModalDialog();
  }

  updateBook(index: number, newBook: Book) {
    this.isExist();
    if(!this.isBookExist) {
      this.books[index] = newBook;
      this.closeModalDialog();
      this.toaster.showInfo();
    } else {
        this.isBookExist = false;
        this.toaster.showError();
    }
  }

  addBook(book: Book) {
    this.books.push(book);  
  }

  getBook(index: number) {
    return this.books[index];
  }

  isFieldsEmpty() {
    if(this.bookForm.value.id == '' || this.bookForm.value.title == '' || this.bookForm.value.authors == '' 
      || this.bookForm.value.picture == '' 
      || this.bookForm.value.publishedDate == null) {
        return true;
      } else {
        return false;
      }
  }

  private initForm() {
    let bookId = '';
    let bookTitle = '';
    let bookImg = '';
    let bookAuthors = '';
    let bookPublishedDate = null;
    
    if(this.editMode) {
      const book = this.getBook(this.id);
      bookId = book.id;
      bookTitle = book.title;
      bookImg = book.picture;
      bookAuthors = book.authors;
      bookPublishedDate = moment(book.publishedDate).format('YYYY-MM-DD').toString();
    }
    
    this.bookForm = new FormGroup({
      'id': new FormControl(bookId, Validators.required),
      'title': new FormControl(bookTitle, Validators.required),
      'authors': new FormControl(bookAuthors, Validators.required),
      'publishedDate': new FormControl(bookPublishedDate, Validators.required),
      'picture': new FormControl(bookImg, Validators.required)
    });
  }
}
