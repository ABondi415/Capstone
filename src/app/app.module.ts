// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule} from '@angular/material/snack-bar';


// Custom Modules
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { GameComponent } from './game/game.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { ProfileComponent } from './profile/profile.component';

// Services
import { AuthService } from './auth.service';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    GameComponent,
    LoginComponent,
    ChatWidgetComponent,
    TaskDetailsComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    AppRoutingModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  entryComponents: [TaskDetailsComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
