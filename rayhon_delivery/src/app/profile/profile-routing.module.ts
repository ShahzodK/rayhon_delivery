import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LocationPageComponent } from './pages/location-page/location-page.component';

const routes: Routes = [
  { path: '', component: ProfilePageComponent },
  { path: 'location', component: LocationPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }