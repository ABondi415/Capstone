import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

import { Task } from '../model/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [HttpService]
})
export class TaskListComponent implements OnInit {

  taskList: Array<Task> = [];
  newTaskDescription: string = "";

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getTasks().then(tasks =>  this.taskList = tasks);
  }

  addTask(): void {
    if (this.newTaskDescription.length === 0) return;

    let newTask = new Task(null, null, this.newTaskDescription);
    this.httpService.addTask(newTask).then(task => {
      this.taskList.push(task);
      this.newTaskDescription = "";
    });
  }
}
