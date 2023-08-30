import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliverToComponent } from './components/deliver-to/deliver-to.component';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home.routing.module';



@NgModule({
  declarations: [
    HomePagesComponent,
    DeliverToComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers: []
})
export class HomeModule { }
