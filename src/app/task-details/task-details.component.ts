import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../http.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Task } from '../model/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task: Task;

  constructor(public dialogRef: MatDialogRef<TaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService) { }

  ngOnInit() {
    this.task = new Task(this.data.task.id,
      this.data.task.dueDate,
      this.data.task.description,
      this.data.task.selected);
  }

  onUpdateClick(): void {
    this.httpService.updateTask(this.task).subscribe(task => {
      this.data.task.id = task.id;
      this.data.task.dueDate = task.dueDate;
      this.data.task.description = task.description;
      this.data.task.selected = task.selected;

      this.dialogRef.close();
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
