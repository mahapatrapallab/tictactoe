import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  twoplayer=true;
  playerx="";
  playero="";
  choice="";
  constructor() { }
  playbinder(setnames:(x:string,o:string)=>void){
    this.names=setnames;
  }
  appbinder(restart:(val:boolean)=>void){
    this.newgame=restart;
  }
  vsComputer(){
    if(!this.twoplayer){
      if(this.choice==='X')
        this.playero="Computer";
      else{
        this.playero=this.playerx;
        this.playerx="Computer";
      }
    }
    this.names(this.playerx,this.playero);
  }
  names(x:string,o:string){}
  newgame(val:boolean){}
}
