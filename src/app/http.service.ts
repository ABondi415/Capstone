import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Task } from './model/task';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = '/api';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  addTask(task: Task): Promise<Task> {
    console.log(JSON.stringify(task));
    return this.http
      .post(this.apiUrl + '/task', JSON.stringify(task), { headers: this.headers })
      .toPromise()
      .then((response: Response) => { return response.json(); })
      .catch(this.handleError);
  };

  getTasks(): Promise<Task[]> {
    return this.http
      .get(this.apiUrl + '/tasks', { headers: this.headers })
      .toPromise()
      .then((response: Response) => { return response.json(); })
      .catch(this.handleError);
  };

  handleError(error: any): Promise<any> {
    console.error('Error', error);
    return Promise.reject(error.message || error);
  };
}
