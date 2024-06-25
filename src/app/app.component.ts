import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { ModalService } from './modal.service';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title="tictactoe"

  show=true;
  constructor(public modal:ModalService){
    modal.appbinder(this.newgame.bind(this));
  }
  newgame(val:boolean){
    this.show=val;
  }
}
