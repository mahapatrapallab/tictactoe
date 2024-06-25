import { Component } from '@angular/core';
import { GameplayService } from '../gameplay.service';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  animations:[
    trigger('play',[
      state('default',style({})),
      state('win',style({
        backgroundColor: 'royalblue',
        borderColor: 'violet',
        position: 'relative',
        boxShadow: '0px 0px 10px 10px black',
        zIndex: '1'
      })),
      transition('default => win',animate('500ms ease-in'))
    ])
  ]
})
export class BoardComponent {

  constructor(public game:GameplayService){}
}
