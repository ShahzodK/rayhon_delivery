import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LocationPageComponent } from './pages/location-page/location-page.component';
import { ProfileSettingsPageComponent } from './pages/profile-settings-page/profile-settings-page.component';
import { ProfileAddressPageComponent } from './pages/profile-address-page/profile-address-page.component';
import { ProfileLanguagePageComponent } from './pages/profile-language-page/profile-language-page.component';
import { UpdateLocationPageComponent } from './pages/update-location-page/update-location-page.component';
import { ProfileSupportPageComponent } from './pages/profile-support-page/profile-support-page.component';
import { ProfileNotificationsPageComponent } from './pages/profile-notifications-page/profile-notifications-page.component';
import { ProfileFavoritesComponent } from './pages/profile-favorites/profile-favorites.component';

const routes: Routes = [
  { path: '', component: ProfilePageComponent },
  { path: 'location', component: LocationPageComponent },
  { path: 'settings', component: ProfileSettingsPageComponent },
  { path: 'address', component: ProfileAddressPageComponent },
  { path: 'language', component: ProfileLanguagePageComponent },
  { path: 'location/:id', component: UpdateLocationPageComponent },
  { path: 'support', component: ProfileSupportPageComponent },
  { path: 'notifications', component: ProfileNotificationsPageComponent },
  { path: 'favorites', component: ProfileFavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }