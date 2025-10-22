import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NewHomeComponent } from './new-home/new-home.component';


const routes: Routes = [
  { path: 'xxx', component: HomeComponent
  },
  { path: '', component: NewHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
