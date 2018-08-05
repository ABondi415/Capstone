import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWidgetComponent } from './chat-widget.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '../http.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ChatWidgetComponent', () => {
  let component: ChatWidgetComponent;
  let fixture: ComponentFixture<ChatWidgetComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatWidgetComponent],
      providers: [
        HttpService,
        AuthService
      ],
      imports: [
        FormsModule,
        MatInputModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        RouterTestingModule,
        HttpClientTestingModule,
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
    
    fixture = TestBed.createComponent(ChatWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
