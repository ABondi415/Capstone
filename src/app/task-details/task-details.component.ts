import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../http.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AuthService } from '../auth.service';
import { User } from '../model/user';

import { Task } from '../model/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
  providers: [HttpService, AuthService]
})
export class TaskDetailsComponent implements OnInit {
  task: Task;
  taskUser = new User(null, null, null, null, null);

  constructor(public dialogRef: MatDialogRef<TaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.task = new Task(this.data.task.id,
      this.data.task.dueDate,
      this.data.task.description,
      this.data.task.taskPriority,
      this.data.task.taskDetail,
      this.data.task.taskCompleted,
      this.data.task.voiceReminder,
      this.data.task.sprite,
      false,
      this.data.task.userId);


      // get the userdata
      if(this.authService.isAuthenticated){
        let currentUserId = JSON.parse(localStorage.getItem('currentUser')).userId;
        this.taskUser.userId = currentUserId;
        this.httpService.getOrCreateUser(this.taskUser).subscribe(user => this.taskUser = user);
       }

  }

  onUpdateClick(): void {

    if (this.data.task.taskCompleted != this.task.taskCompleted) {
      if (this.task.taskCompleted){
        this.addPoints();
      }
      else {
        this.removePoints();
      }
    }
    this.updateTaskInfo();
  }


updateTaskInfo(){
    this.httpService.updateTask(this.task).subscribe(task => {
      this.data.task.id = task.id;
      this.data.task.dueDate = task.dueDate;
      this.data.task.description = task.description;
      this.data.task.taskPriority = task.taskPriority;
      this.data.task.taskDetail = task.taskDetail;
      this.data.task.taskCompleted = task.taskCompleted;
      this.data.task.voiceReminder = task.voiceReminder;
      this.data.task.sprite = task.sprite;
      //this.data.task.selected = task.selected;
      this.data.task.userId = task.userId;

      this.dialogRef.close();
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  addPoints() {
    //TBD:  generate a good-job message here...
    this.taskUser.score = this.taskUser.score + 10;
    this.updateUserScore();
  }

  removePoints() {
    this.taskUser.score = this.taskUser.score - 10;
    this.updateUserScore();
  }

  updateUserScore() {
    this.httpService.updateUser(this.taskUser).subscribe(user => this.taskUser);
  }

}