import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PrivateAreaComponent} from "./private-area/private-area.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'me', component: PrivateAreaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
