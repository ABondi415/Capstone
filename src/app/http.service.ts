import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as io from 'socket.io-client';

import { Task } from './model/task';
import { User } from './model/user';
import { Message } from './model/message';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private taskUrl = 'api/task';
  private userUrl = 'api/user';
  private messageUrl = 'api/message';
  private myTaskUrl = 'api/my-tasks';
  private socket;

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl, httpOptions)
      .pipe(
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  };

  getUserTasks(userId: string): Observable<Task[]> {
    let params = new HttpParams().set('userId', userId);
  
    return this.http.get<Task[]>(this.myTaskUrl, {'headers': httpOptions.headers, 'params': params})
      .pipe(
        catchError(this.handleError<Task[]>('getUserTasks', []))
      );
  };

  getUserMessages(userId: string): Observable<Message[]> {
    let params = new HttpParams().set('userId', userId);

    return this.http.get<Message[]>(this.messageUrl, { 'headers': httpOptions.headers, 'params': params })
      .pipe(
        map(messages => {
          messages.forEach(m => m.createdDateTime = new Date(m.createdDateTime));
          return messages.sort((a, b) => { return b.createdDateTime.valueOf() - a.createdDateTime.valueOf(); });
        }),
        catchError(this.handleError<Message[]>('getUserMessages', []))
      );
  }

  sendUserMessage(message: Message, userId: string, chatbotSessionId: string): Observable<string> {
    let body = {
      message: message,
      userId: userId,
      chatbotSessionId: chatbotSessionId
    };

    return this.http.post<string>(this.messageUrl, body, httpOptions)
      .pipe(
        catchError(this.handleError<string>('sendUserMessage'))
      );
  }

  getMessages(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket = io();

      this.socket.on('INCOMING', (data: Message) => {
        observer.next(data);
      });

      this.socket.on('OUTGOING', (data: Message) => {
        observer.next(data);
      });

      return () => this.socket.disconnect();
    });
  }

  getOrCreateUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError<User>('getOrCreateUser'))
      );
  };

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError<User>('addUser'))
      );
  };

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.userUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError<User>('updateUser'))
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
