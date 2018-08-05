import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable, forkJoin } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';


import { TaskDetailsComponent } from '../task-details/task-details.component';

import { Task } from '../model/task';
import { User } from '../model/user';

import { AuthService } from '../auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [HttpService, AuthService]
})
export class TaskListComponent implements OnInit {
  taskList: Array<Task> = [];
  newTaskDescription: string = "";
  newTaskDueDate:Date;
  newTaskPriority: boolean;
  newTaskDetail: string = "";
  newTaskCompleted: boolean;
  newTaskvoiceReminder: boolean;
  taskUser = new User(null, null, null, null, null, null, null, false);

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if(this.authService.isAuthenticated){
      let currentUserId = JSON.parse(localStorage.getItem('currentUser')).userId;
      this.taskUser.userId = currentUserId;
      this.httpService.getOrCreateUser(this.taskUser).subscribe(user => this.taskUser = user);

      this.httpService.getUserTasks(currentUserId).subscribe(tasks =>  {
        this.taskList = tasks
        this.showReminders();
        this.overDueCheck();
      });
    }
  }

  addTask(): void {
    if (this.newTaskDescription.length === 0) return;

    let newTask = new Task(null, null, null, this.newTaskDescription,false,this.newTaskDetail, false,false, null, false, localStorage.getItem('userId'));
    this.httpService.addTask(newTask).subscribe(task => {
      this.taskList.push(task);
      this.newTaskDescription = "";
      this.newTaskDueDate=null;
      this.newTaskDetail = "";
    });
  }

  editTask(): void {
    let selectedTask = this.taskList.find(t => t.selected);
    this.openTaskDetailsDialog(selectedTask);
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
  }

  showReminders(){
    let hasBeenReminded: boolean = localStorage.getItem('hasBeenReminded') === "true";
    let notifyMe: boolean = this.taskUser.receiveNotifications;

    if(this.taskList.length > 0 && !hasBeenReminded && notifyMe){
      localStorage.setItem('hasBeenReminded', "true");
      this.snackBar.open("Keep the zombies at bay, complete a task to increase your score!", "Got it!", {duration: 5000});
    }
  }

  overDueCheck(){
    let observables:Array<Observable<Task>> = [];
    this.taskList.forEach(task => {
      let todayMoment = moment(new Date);
      let penaltyMoment = moment(new Date(task.penaltyDate));
      let daysDiff = todayMoment.diff(penaltyMoment, 'days');
      
      if(task.penaltyDate != null && daysDiff > 0){
        this.taskUser.score = this.taskUser.score - ((daysDiff) * 10);
        this.httpService.updateUser(this.taskUser).subscribe(user => this.taskUser);
        task.penaltyDate = todayMoment.toDate();
        observables.push(this.httpService.updateTask(task));
      }
    });

    if(observables.length > 0){
      forkJoin(observables).subscribe( () => 
        this.snackBar.open("Some overdue tasks let the zombies get closer!", "Yikes!", {duration: 5000})
      );
    }
  }

  toggleSelection(task: Task): void {
    task.selected = task.selected ? false : true;
  }

  private removeTask(taskId: string) {
    let index = this.taskList.indexOf(this.taskList.find(task => task.id === taskId));
    this.taskList.splice(index, 1);
  }

  private openTaskDetailsDialog(task: Task): void {
    let dialogRef = this.dialog.open(TaskDetailsComponent, {
      width: '500px',
      data: { task: task }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  onKey(event: KeyboardEvent): void {
    if (event.key !== "Enter") return;

    if (!this.newTaskDescription || this.newTaskDescription.length === 0) return;

    this.addTask();
  }
}
