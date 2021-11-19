import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { allBooks, allReaders } from 'app/data';
import { Reader } from 'app/models/reader';
import { Book } from 'app/models/book';
import { OldBook } from 'app/models/oldBook';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find((reader) => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    console.log('Getting all books from the server');
    return this.http.get<Book[]>('/api/books');
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`/api/books/${id}`, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'my-token',
      }),
    });
  }

  getOldBookId(id: number): Observable<OldBook> {
    return this.http.get<Book>(`/api/books/${id}`).pipe(
      map(
        (b) =>
          <OldBook>{
            bookTitle: b.title,
            year: b.publicationYear,
          }
      ),
      tap((classicBook) => console.log(classicBook))
    );
  }
}
