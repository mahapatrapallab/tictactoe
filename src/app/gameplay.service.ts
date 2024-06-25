import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameplayService {

  board:string[][]=[[" "," "," "],[" "," "," "],[" "," "," "]];
  x={x:true};
  o={o:true};

  turn="X";
  moves=0;
  disable=false;
  row:number[]=[];
  column:number[]=[];
  points=0;

  constructor() { }
  binder(cb:()=>void){
    this.callback=cb;
  }
  callback(){}
  score(){
    let pt=1;
    this.board.forEach((row)=>{
      row.forEach((val)=>{
        if(val===" ")
          pt++;
      });
    });
    return pt;
  }
  place(i:number,j:number){
    if(this.board[i][j]===" " && this.disable===false && this.moves<9){
        this.board[i][j]=this.turn;
        this.moves++;
        this.check(i,j);
    }
  }
  check(i:number,j:number){
    if(this.board[i].every((val)=>{return (val===this.turn)})){
      this.row=[i,i,i];
      this.column=[0,1,2];
      this.disable=true;
    }
    if(this.board[0][j]===this.turn && this.board[1][j]===this.turn && this.board[2][j]===this.turn){
      this.row=[0,1,2];
      this.column=[j,j,j];
      this.disable=true;
    }
    if(i===j && this.board[0][0]===this.turn&&this.board[1][1]===this.turn&&this.board[2][2]===this.turn){
      this.row=[0,1,2];
      this.column=[0,1,2];
      this.disable=true;
    }
    if((i+j)===2 && this.board[0][2]===this.turn&&this.board[1][1]===this.turn&&this.board[2][0]===this.turn){
      this.row=[0,1,2];
      this.column=[2,1,0];
      this.disable=true;
    }
    if(this.disable===false){
      if(this.turn==="X")
        this.turn="O";
      else
        this.turn="X";
    }
    this.callback();
  }

  bot(bot:string){
    let ar:(boolean|null)[]=[];
    let copy:(boolean|null)[]=[];
    this.board.forEach((row)=>{
      row.forEach((val)=>{
        if(bot==='X'){
          if(val==='X'){
            ar.push(true);
            copy.push(true);
          }
          else if(val==='O'){
            ar.push(false);
            copy.push(false);
          }
          else{
            ar.push(null);
            copy.push(null);
          }
        }
        else{
          if(val==='O'){
            ar.push(true);
            copy.push(true);
          }
          else if(val==='X'){
            ar.push(false);
            copy.push(false);
          }
          else{
            ar.push(null);
            copy.push(null);
          }
        }
      });
    });

    this.minmax(ar,true,(res,pt)=>{
      let n=res.findIndex((val,n)=>{return (val!==copy[n]);});
      this.disable=false;
      this.place(Math.floor(n/3),n%3);
    });
  }
  minmax(ar:(null|boolean)[],flag:boolean,returner:(res:(null|boolean)[],pt:number)=>void){
    let arfinal:(null|boolean)[];
    let score:number=(flag)?Number.MIN_SAFE_INTEGER:Number.MAX_SAFE_INTEGER;
  
    ar.forEach((val,n,arr)=>{
      if(val===null){
        arr[n]=flag;
        let original:(boolean|null)[]=[];
        let copy:(boolean|null)[]=[];
        arr.forEach((val)=>{
          original.push(val);
          copy.push(val);
        });
        if(
          (arr[Math.floor(n/3)*3+0]===flag&&arr[Math.floor(n/3)*3+1]===flag&&arr[Math.floor(n/3)*3+2]===flag)||
          (arr[(0*3)+(n%3)]===flag&&arr[(1*3)+(n%3)]===flag&&arr[(2*3)+(n%3)]===flag)||
          (arr[0]===flag&&arr[4]===flag&&arr[8]===flag)||
          (arr[2]===flag&&arr[4]===flag&&arr[6]===flag)
        ){
          let c=1;
          arr.forEach((val)=>{
            if(val===null)
              c++;
          });
          if(flag===true){
            let pt=c*1;
            if(pt>score){
              score=pt
              arfinal=[];
              arfinal=original;
            }
          }
          else{
            let pt=c*(-1);
            if(pt<score){
              score=pt
              arfinal=[];
              arfinal=original;
            }
          }
          arr[n]=null;
          return;
        }
        this.minmax(copy,!flag,(res,pt)=>{
          if(flag===true&&pt>score){
            score=pt;
            arfinal=[];
            arfinal=original;
          }
          if(flag===false&&pt<score){
            score=pt;
            arfinal=[];
            arfinal=original;
          }
          arr[n]=null;
        });
      }
    });
    if(score===Number.MAX_SAFE_INTEGER||score===Number.MIN_SAFE_INTEGER){
      score=0;
      arfinal=ar;
    }
    returner(arfinal!,score);
  }
}