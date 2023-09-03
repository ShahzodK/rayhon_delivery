import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';
import { DeliverToComponent } from './components/deliver-to/deliver-to.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { SpecialOffersItemComponent } from './components/special-offers/special-offers-item/special-offers-item.component';

const routes: Routes = [
  { path: '', component: HomePagesComponent },
  { path: 'deliver-to', component: DeliverToComponent},
  { path: 'special-offers', component: SpecialOffersComponent},
  { path: 'special-offers/:id', component: SpecialOffersItemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }