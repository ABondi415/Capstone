import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from './model/task';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private taskUrl = 'api/task';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl, httpOptions)
      .pipe(
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  };

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, task, httpOptions)
      .pipe(
        catchError(this.handleError<Task>('addTask'))
      );
  };

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
