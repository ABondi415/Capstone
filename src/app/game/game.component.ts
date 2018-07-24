import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';

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
  gameUser = new User(null, null, null, null, null, null, 'greenSmile');

  gameDataLoaded = false;

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
      this.gameUser.userId = currentUserId;

      let service1 = this.httpService.getUserTasks(currentUserId);
      let service2 = this.httpService.getOrCreateUser(this.gameUser);

      forkJoin(service1, service2)
        .subscribe (([tasks,user]) => {
            this.taskList = tasks;
            this.gameUser = user;
            this.gameDataLoaded = true;
        }); 
    }


  }

  //draw on the canvas
  draw(stage) {

    stage.clear();
    stage.removeAllChildren();

    this.generateHero(stage);

    //for each enemy task, add an image
    for (var i in this.taskList) {
      var spriteName = this.taskList[i].sprite;
      alert(spriteName);
      
      //calculate days remaining
      var today = new Date()
      var todaysTime = today.getTime();

      var taskDueDate = new Date(this.taskList[i].dueDate)
      var taskDueTime = taskDueDate.getTime();

      if (taskDueTime > todaysTime) {
        var timeDiff = Math.abs(taskDueTime - todaysTime);
        alert (timeDiff);
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        alert ("diffDays:" + diffDays);
      

        if ((this.taskList[i].taskCompleted != true) && (spriteName != "") && (diffDays > 0) && (diffDays < 8)) {
          //calculate the sprite location
          alert("inside the create image if")
          var x = this.getImgLoc(diffDays);
          this.generateEnemy(stage, spriteName, x);
          alert (x);
        }  
      }
    }
    

    //update the stage
    stage.update();
  }

  refreshCanvas(){
    //create a stage on the canvas
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

    var stage = new createjs.Stage(this.canvasEl.nativeElement as HTMLCanvasElement);
    this.draw(stage);
  }


  generateHero(stage) {
      //draw the hero image
      var heroImg = new Image();
      heroImg.src = this.getImgSrc(this.gameUser.sprite);
   
      heroImg.onload = function() {
        var heroBitmap = new createjs.Bitmap(heroImg.src);
        heroBitmap.x = 10;
        heroBitmap.y = 150;
        stage.addChild(heroBitmap);
        stage.update()
      }
  }


  generateEnemy(stage, imgName:string, x:number) {
    //draw the enemy image
    var enemyImg = new Image()
    enemyImg.src = this.getImgSrc(imgName);

    enemyImg.onload = function() {
      var enemyBitmap = new createjs.Bitmap(enemyImg);
      enemyBitmap.x = x;
      enemyBitmap.y = 150;
      stage.addChild(enemyBitmap);
      stage.update()
    }
  }

  getImgSrc(imgName:string): string {
    var imgSrc = "";
    switch (imgName) {
      case 'redSmile':
        imgSrc = '../assets/Smile Red.png';
        break;
      case 'orangeSmile':
        imgSrc = '../assets/Smile Orange.png';
        break;
      case 'yellowSmile':
        imgSrc = '../assets/Smile Yellow.png';
        break;
      case 'greenSmile':
        imgSrc = '../assets/Smile Green.png';
        break;
      case 'blueSmile':
        imgSrc = '../assets/Smile Blue.png';
        break;
      case 'purpleSmile':
        imgSrc = '../assets/Smile Purple.png';
        break;
      default: 
        imgSrc = '../assets/Smile Orange.png';
    }
    return (imgSrc);
  }

  getImgLoc(diffDays:number): number {
    var x = 0;
    switch (diffDays) {
      case 0:
        x = 50;
        break;
      case 1:
        x = 100;
        break;
      case 2:
        x = 200;
        break;
      case 3:
        x = 300;
        break;
      case 4:
        x = 400;
        break;
      case 5:
        x = 500;
        break;
      case 6:
        x = 600;
        break;
      case 7:
        x = 700;
        break;
      default: 
        x = 750;
        break;
    }
    return (x);
  }


}




