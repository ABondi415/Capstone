// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

// Custom Modules
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { GameComponent } from './game/game.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

// Services
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    GameComponent,
    LoginComponent,
    TaskDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule
  ],
  entryComponents: [TaskDetailsComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
