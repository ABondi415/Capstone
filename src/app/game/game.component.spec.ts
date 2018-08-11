import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { MatDialog } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';

import { TaskDetailsComponent } from '../task-details/task-details.component';
import { MatDialogModule, MatFormFieldModule, MatListModule, MatInputModule, MatCheckboxModule, MatOptionModule, MatSelectModule, MatSnackBarModule } from '@angular/material';

import { RouterTestingModule } from '@angular/router/testing'
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '../http.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, TaskDetailsComponent],
      providers: [
        HttpService],
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
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule
      ]
    }).compileComponents();;

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    let user = {
      id: '1234',
      userId: 'a1234',
      firstName: 'Test',
      lastName: 'User',
      emailAddress: 'testuser@test.com',
      score:  0,
      sprite: null,
      receiveNotifications: false
    };
    localStorage.setItem('currentUser', JSON.stringify(user));

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
