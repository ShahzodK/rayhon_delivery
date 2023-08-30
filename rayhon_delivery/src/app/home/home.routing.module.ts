import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';
import { DeliverToComponent } from './components/deliver-to/deliver-to.component';

const routes: Routes = [
  { path: '', component: HomePagesComponent },
  { path: 'deliver-to', component: DeliverToComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }