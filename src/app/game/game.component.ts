import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
import { Task } from '../model/task';
import { User } from '../model/user';

// CreateJS module for game (EaselJS)
import * as createjs from 'createjs-module';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [HttpService, AuthService]
})
export class GameComponent implements OnInit { 

  // set up an array to hold task data
  taskList: Array<Task> = [];

  //set up a gameUser
  gameUser = new User(null, null, null, null, null);

  /** Template reference to the canvas element */
  @ViewChild('canvasEl') canvasEl: ElementRef;

  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private httpService: HttpService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    // get the user and task data
    if(this.authService.isAuthenticated){
      let currentUserId = JSON.parse(localStorage.getItem('currentUser')).userId;
      this.httpService.getUserTasks(currentUserId).subscribe(tasks =>  this.taskList = tasks);
      this.gameUser.userId = currentUserId;
      this.httpService.getOrCreateUser(this.gameUser).subscribe(user => this.gameUser = user);
    }


    //get the canvas element from the html
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    this.draw();

  }

  //draw on the canvas
  private draw() {
    //create a stage on the canvas
    var stage = new createjs.Stage(this.canvasEl.nativeElement as HTMLCanvasElement);

    //draw the hero image
    var heroImg = new Image();
    heroImg.src = '../assets/Smile.png';
 
    heroImg.onload = function() {
      var heroBitmap = new createjs.Bitmap('../assets/Smile.png');
      heroBitmap.x = 10;
      heroBitmap.y = 150;
      stage.addChild(heroBitmap);
      stage.update()
    }

    //draw the enemy image
    var enemyImg = new Image()
    enemyImg.src ='../assets/Zombie.png';

    enemyImg.onload = function() {
      var enemyBitmap = new createjs.Bitmap(enemyImg);
      enemyBitmap.x = 700;
      enemyBitmap.y = 150;
      stage.addChild(enemyBitmap);
      stage.update()
    }

    //update the stage
    stage.update();
  }

}




