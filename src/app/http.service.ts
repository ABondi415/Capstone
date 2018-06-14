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

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.taskUrl, task, httpOptions)
      .pipe(
        catchError(this.handleError<Task>('updateTask'))
      );
  };


  deleteTask(task: Task): Observable<string> {
    const url = `${this.taskUrl}/${task.id}`;

    return this.http.delete<string>(url, httpOptions)
      .pipe(
        catchError(this.handleError<string>('deleteTask'))
      );
  };

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
