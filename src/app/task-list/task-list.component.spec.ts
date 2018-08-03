import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatListModule, MatInputModule, MatCheckboxModule, MatOptionModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

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
        MatInputModule,
        MatListModule,
        MatCheckboxModule,
        MatOptionModule,
        MatSelectModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      providers: [
        HttpService,
        AuthService,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should create', () => {
    let user = {
      userId: 'a1234'
    };
    localStorage.setItem('currentUser', JSON.stringify(user));

    expect(component).toBeTruthy();
  });
});
