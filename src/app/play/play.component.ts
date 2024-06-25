import { Component } from '@angular/core';
import { GameplayService } from '../gameplay.service';
import { ModalService } from '../modal.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../board/board.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CommonModule,BoardComponent,FormsModule],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css',
  animations:[
    trigger('win',[
      state('win',style({
        opacity:"1",
        height:"auto",
        width:"auto",
        fontSize:"3vmin",
        transform:"rotate(360deg)"
      })),
      transition('void => win',animate("1000ms 500ms ease-in"))
    ]),
    trigger('tie',[
      state('tied',style({
        opacity:"1",
        height:"auto",
        width:"auto",
        fontSize:"3vmin",
      })),
      transition('void => tied',animate("1000ms ease-in"))
    ]),
    trigger('end',[state('re',style({opacity:"1"})),transition('void => re',animate("500ms 2000ms"))])
  ]
})
export class PlayComponent {
  start=false;
  playerx="";
  playero="";
  xlight={
    shadowx:true,
    shadowin:false
  }
  olight={
    shadowo:false,
    shadowin:false
  }
  constructor(private router:Router,public game:GameplayService,public modal:ModalService){
    game.binder(this.light.bind(this));
    modal.playbinder(this.setplayrnames.bind(this));
    modal.newgame(false);
  }
  setplayrnames(x:string,o:string){
    this.playerx=x;
    this.playero=o;
    if(this.playerx==="Computer")
      setTimeout(() => {
        this.game.bot('X');
      }, 1000);
  }
  
  newgm(){
    this.start=false;
    this.playero="";
    this.playerx="";
    this.modal.choice="";
    this.modal.playero="";
    this.modal.playerx="";
    this.xlight.shadowin=false;
    this.xlight.shadowx=true;
    this.olight.shadowin=false;
    this.olight.shadowo=false;
    this.game.board=[[" "," "," "],[" "," "," "],[" "," "," "]];
    this.game.turn="X";
    this.game.moves=0;
    this.game.disable=false;
    this.game.row=[];
    this.game.column=[];
    this.router.navigateByUrl("newgame");
    this.modal.newgame(true);
  }
  re(){
    this.xlight.shadowin=false;
    this.xlight.shadowx=true;
    this.olight.shadowin=false;
    this.olight.shadowo=false;
    this.game.board=[[" "," "," "],[" "," "," "],[" "," "," "]];
    this.game.turn="X";
    this.game.moves=0;
    this.game.disable=false;
    this.game.row=[];
    this.game.column=[];
    if(this.playerx==='Computer'){
      setTimeout(() => {
        this.game.bot('X');
      }, 1000);
    }
  }
  light(){
    if(this.game.turn==="X"){
      if(this.game.disable===true){
        this.game.points=this.game.score();
        setTimeout(() => {
          this.xlight.shadowin=true;
          this.olight.shadowo=false;
        }, 1500);
      }
      else if(this.game.moves<9){
        this.xlight.shadowx=true;
        this.olight.shadowo=false;
        if(this.playerx==='Computer'){
          setTimeout(() => {
            this.game.bot('X');
          }, 1000);
        }
      }
    }
    else{
      if(this.game.disable===true){
        this.game.points=this.game.score();
        setTimeout(() => {
          this.olight.shadowin=true;
          this.xlight.shadowx=false;
        }, 1500);
      }
      else if(this.game.moves<9){
        this.olight.shadowo=true;
        this.xlight.shadowx=false;
        if(this.playero==='Computer'){
          setTimeout(() => {
            this.game.bot('O');
          }, 1000);
        }
      }
    }
    if(this.game.moves===9){
      this.xlight.shadowx=false;
      this.olight.shadowo=false;
    }
  }
}
