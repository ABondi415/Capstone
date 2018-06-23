import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsComponent } from './task-details.component';
import { HttpService } from '../http.service';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatDialogRef } from '@angular/material';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TaskDetailsComponent
      ],
      providers: [
        HttpService,
        MatDialogRef
      ],
      imports: [
        FormsModule,
        MatDialogModule,
        MatFormFieldModule
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
