import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LocationPageComponent } from './pages/location-page/location-page.component';
import { ProfileSettingsPageComponent } from './pages/profile-settings-page/profile-settings-page.component';
import { ProfileAddressPageComponent } from './pages/profile-address-page/profile-address-page.component';

const routes: Routes = [
  { path: '', component: ProfilePageComponent },
  { path: 'location', component: LocationPageComponent },
  { path: 'settings', component: ProfileSettingsPageComponent },
  { path: 'address', component: ProfileAddressPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }