import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import mockConsole from 'jest-mock-console';

import { ProfileComponent } from './profile.component';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../auth.service';
import { HttpService } from '../http.service';
import { MatCardModule, MatSlideToggleModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let restoreConsole: any;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent
      ],
      providers: [
        AuthService,
        HttpService
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        HttpClientTestingModule,
        MatCardModule,
        MatSlideToggleModule,
        RouterTestingModule,
        NoopAnimationsModule
      ]
    });

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
      preferences: '{ "notifications": false }'
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    restoreConsole = mockConsole();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    restoreConsole();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
