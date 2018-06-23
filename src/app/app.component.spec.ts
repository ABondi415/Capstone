import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        ChatWidgetComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        AuthService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'Zombie Task Scheduler'`, async(() => {
    expect(component.title).toEqual('Zombie Task Scheduler');
  }));
});
