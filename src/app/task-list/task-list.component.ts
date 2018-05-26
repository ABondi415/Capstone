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

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    let task = new Task();
    task.id = 1234;
    task.description = "Test task"

    console.log(task);

    this.httpService.addTask(task).then(response => {
      // do something
    });
  }

}
