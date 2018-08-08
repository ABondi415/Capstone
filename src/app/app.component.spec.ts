import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ChatWidgetComponent
      ],
      imports: [
        FormsModule,
        MatInputModule,
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        HttpService,
        AuthService
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
});
