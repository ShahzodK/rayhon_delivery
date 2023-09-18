import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliverToComponent } from './components/deliver-to/deliver-to.component';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home.routing.module';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { SpecialOffersItemComponent } from './components/special-offers/special-offers-item/special-offers-item.component';



@NgModule({
  declarations: [
    HomePagesComponent,
    DeliverToComponent,
    SpecialOffersComponent,
    SpecialOffersItemComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers: []
})
export class HomeModule { }
