import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';
import { DeliverToComponent } from './components/deliver-to/deliver-to.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { SpecialOffersItemComponent } from './components/special-offers/special-offers-item/special-offers-item.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { FoodInfoPageComponent } from './pages/food-info-page/food-info-page.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { PopularComponent } from './components/popular/popular.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';

const routes: Routes = [
  { path: '', component: HomePagesComponent, data: {url: '/home'}},
  { path: 'deliver-to', component: DeliverToComponent},
  { path: 'special-offers', component: SpecialOffersComponent},
  { path: 'special-offers', component: SpecialOffersComponent},
  { path: 'special-offers/:id', component: SpecialOffersItemComponent},
  { path: 'popular', component: PopularComponent },
  { path: 'search', component: SearchPageComponent},
  { path: 'menu/:id', component: FoodInfoPageComponent },
  { path: 'notifications', component: NotificationsPageComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'category', component: CategoriesPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }