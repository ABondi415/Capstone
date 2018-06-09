import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    /** Template reference to the canvas element */
    @ViewChild('canvasEl') canvasEl: ElementRef;
  
    /** Canvas 2d context */
    private context: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    this.draw();
  }

  ngAfterViewInit() {

  }

    /**
   * Draws something using the context we obtained earlier on
   */
  private draw() {
    var ctx = this.context;

    //draw text
    ctx.font = "20px Georgia";
    ctx.strokeText("This is the game canvas", 0, 20);


    // draw the hero
    var img = new Image();
    img.onload = function (){
      ctx.drawImage(img, 0, 300);
      // this is the x,y location of the image on the canvas
    }
    img.src = '../assets/Smile.png';
   
    //draw the enemy
    var enemy = new Image();
    enemy.onload = function (){
      ctx.drawImage(enemy, 200, 200);
      // this is the x,y location of the image on the canvas
    }
    enemy.src = '../assets/Zombie.png';
   
  }


}

 


