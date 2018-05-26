import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Task } from './model/task';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = '/api';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  addTask(task: Task): Promise<any> {
    console.log(JSON.stringify(task));
    return this.http
      .post(this.apiUrl + '/task', JSON.stringify(task), { headers: this.headers })
      .toPromise()
      .then(response => { })
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('Error', error);
    return Promise.reject(error.message || error);
  } 
}
