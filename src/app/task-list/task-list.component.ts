import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable, forkJoin } from 'rxjs';

import { Task } from '../model/task';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [HttpService]
})
export class TaskListComponent implements OnInit {
  taskList: Array<Task> = [];
  newTaskDescription: string = "";

  constructor(
    private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getTasks().subscribe(tasks =>  this.taskList = tasks);
  }

  addTask(): void {
    if (this.newTaskDescription.length === 0) return;

    let newTask = new Task(null, null, this.newTaskDescription, false);
    this.httpService.addTask(newTask).subscribe(task => {
      this.taskList.push(task);
      this.newTaskDescription = "";
    });
  }

  deleteTasks(): void {
    let observables:Array<Observable<string>> = [];

    this.taskList.forEach(task => {
      if (!task.selected)
        return;

      observables.push(this.httpService.deleteTask(task));
    });

    forkJoin(observables).subscribe(results => {
      results.forEach(result => {
        if(typeof result === "string")
          this.removeTask(result);
      });
    });
  };

  private removeTask(taskId: string) {
    let index = this.taskList.indexOf(this.taskList.find(task => task.id === taskId));
    this.taskList.splice(index, 1);
  }

  toggleSelection(task: Task): void {
    task.selected = task.selected ? false : true;
  }
}
