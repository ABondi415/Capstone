import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material';

import { TaskDetailsComponent } from '../task-details/task-details.component';
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
  gameUser = new User(null, null, null, null, null, null, null, false);

  gameDataLoaded = false;
      //set tags to handle duplicate location
  x1: number = 0; 
  x2: number = 0; 
  x3: number = 0; 
  x4: number = 0;
  x5: number = 0; 
  x6: number = 0;
  x7: number = 0;

  /** Template reference to the canvas element */
  @ViewChild('canvasEl') canvasEl: ElementRef;

  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private httpService: HttpService,
    private authService: AuthService,
    public dialog: MatDialog
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
          if (!this.gameUser.firstName)
            this.gameUser.firstName = user.emailAddress.split('@')[0];
          
          if (!this.gameUser.sprite)
            this.gameUser.sprite = 'greenSmile';

          this.gameDataLoaded = true;
          this.refreshCanvas();
        }); 
    }
  }

  refreshData(stage){
    stage.clear();
    stage.removeAllChildren();
    stage.removeAllEventListeners();
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
          if (!this.gameUser.firstName)
            this.gameUser.firstName = user.emailAddress.split('@')[0];
          
          if (!this.gameUser.sprite)
            this.gameUser.sprite = 'greenSmile';

          this.gameDataLoaded = true;
          this.refreshCanvas();
        }); 
    }
  }

  //draw on the canvas
  draw(stage) {

    stage.clear();
    stage.removeAllChildren();
    stage.removeAllEventListeners();

    this.generateHero(stage);

    //reset tags to handle duplicate location
    this.x1 = this.x2 = this.x3 = this.x4 = this.x5 = this.x6 = this.x7 = 0

    //for each enemy task, add an image
    for (var i in this.taskList) {
      var spriteName = this.taskList[i].sprite;
      
      //calculate days remaining
      var today = new Date()
      var todaysTime = today.getTime();

      var taskDueDate = new Date(this.taskList[i].dueDate)
      var taskDueTime = taskDueDate.getTime();

      if (taskDueTime > todaysTime) {
        var timeDiff = Math.abs(taskDueTime - todaysTime);
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      

        if ((this.taskList[i].taskCompleted != true) && (spriteName != "") && (diffDays > 0) && (diffDays < 8)) {
          var x = this.getImgLoc(diffDays);
          this.generateEnemy(stage, spriteName, x, this.taskList[i]);
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
        //heroBitmap.addEventListener("click", function(heroEvent) {alert("clicked Hero");});
        stage.addChild(heroBitmap);
        stage.update()
      }
  }


  generateEnemy(stage, imgName:string, x:number, task:Task) {
    //draw the enemy image
    var enemyImg = new Image()
    enemyImg.src = this.getImgSrc(imgName);

    var that = this;
    enemyImg.onload = function() {
      var enemyBitmap = new createjs.Bitmap(enemyImg);
      enemyBitmap.x = x;
      enemyBitmap.y = 150;
      var theOther = that;
      enemyBitmap.addEventListener("click", function(enemyEvent) {
        //alert("clicked Enemy "+ task.description);
        let dialogRef = theOther.dialog.open(TaskDetailsComponent, {
          width: '500px',
          data: { task: task }
        });
        dialogRef.afterClosed().subscribe(result => {
          theOther.refreshData(stage);
        });
        
      });
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
    var offset = 0;
    switch (diffDays) {
      case 0:
        x = 50;
        this.x1 = this.x1 + 15;
        offset = this.x1;
        break;
      case 1:
        x = 100;
        this.x2 = this.x2 + 15;
        offset = this.x2;
        break;
      case 2:
        x = 200;
        this.x3 = this.x3+ 15;
        offset = this.x3;
        break;
      case 3:
        x = 300;
        this.x3 = this.x3 + 15;
        offset = this.x3;
        break;
      case 4:
        x = 400;
        this.x4 = this.x4 + 15;
        offset = this.x4;
        break;
      case 5:
        x = 500;
        this.x5 = this.x5 + 15;
        offset = this.x5;
        break;
      case 6:
        x = 600;
        this.x6 = this.x6 + 15;
        offset = this.x6;
        break;
      case 7:
        x = 700;
        this.x7 = this.x7 + 15;
        offset = this.x7;
        break;
      default: 
        x = 750;
        break;
    }
    x = x + offset;
    return (x);
  }


}




