import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatListModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TaskListComponent,
        TaskDetailsComponent
      ],
      imports: [
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatListModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        HttpService,
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
