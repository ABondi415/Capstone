// this module sets up routings

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import each component for use in the routing paths
import { TaskListComponent } from './task-list/task-list.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'task-list', component: TaskListComponent },
  { path: 'game', component: GameComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}


