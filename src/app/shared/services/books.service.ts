import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, flatMap, toArray } from 'rxjs/operators';

import { Book } from './../models/book.model';

@Injectable()
export class BooksService {

  private URL = 'https://www.googleapis.com/books/v1/volumes?q=javascript';

  constructor(private http: HttpClient) {}
  /*
    Get all the books
  */
  getBooks() {
    return this.http.get(this.URL).pipe(
      flatMap((data: any) => { 
        return data.items;
      }),
      map((data: any) => {
        return new Book(
          data.id, 
          data.volumeInfo.title, 
          data.volumeInfo.authors, 
          new Date(data.volumeInfo.publishedDate),
          data.volumeInfo.imageLinks.thumbnail);
      }),
      toArray()
    );
  }
}
