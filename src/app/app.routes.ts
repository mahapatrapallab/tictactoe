import { Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path:"newgame",redirectTo:""},
    {path:"Play",component: PlayComponent}
];
