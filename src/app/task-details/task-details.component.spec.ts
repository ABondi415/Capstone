import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsComponent } from './task-details.component';
import { HttpService } from '../http.service';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatDialogRef, MAT_DIALOG_DATA, MatInputModule, MatCheckboxModule, MatSelectModule, MatOptionModule, MatSnackBarModule, MatSnackBar } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Task } from '../model/task';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;
  let testTask = new Task('1234', new Date(2017, 1, 1), new Date(2017, 1, 2), 'test', true, 'test detail', true, true, "",  false, null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TaskDetailsComponent
      ],
      providers: [
        HttpService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { task: testTask }
        },
        {
          provide: MatSnackBar,
          useValue: {}
        }
      ],
      imports: [
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatOptionModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
