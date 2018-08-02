// this module sets up routings

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import each component for use in the routing paths
import { TaskListComponent } from './task-list/task-list.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'task-list', component: TaskListComponent },
  { path: 'game', component: GameComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatWidgetComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}


