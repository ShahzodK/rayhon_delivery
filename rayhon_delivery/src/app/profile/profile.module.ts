import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { LocationPageComponent } from './pages/location-page/location-page.component';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { ProfileSettingsPageComponent } from './pages/profile-settings-page/profile-settings-page.component';
import { ProfileAddressPageComponent } from './pages/profile-address-page/profile-address-page.component';
import { ProfileLanguagePageComponent } from './pages/profile-language-page/profile-language-page.component';
import { ExitModalComponent } from './components/exit-modal/exit-modal.component';
import { UpdateLocationPageComponent } from './pages/update-location-page/update-location-page.component';
import { ProfileSupportPageComponent } from './pages/profile-support-page/profile-support-page.component';

const mapConfig: YaConfig = {
  apikey: '275222c6-ec7c-4bf1-92a5-e0de7a7cc878',
  lang: 'ru_RU'
};

@NgModule({
  declarations: [
    ProfilePageComponent,
    LocationPageComponent,
    ProfileSettingsPageComponent,
    ProfileAddressPageComponent,
    ProfileLanguagePageComponent,
    ExitModalComponent,
    UpdateLocationPageComponent,
    ProfileSupportPageComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    AngularYandexMapsModule.forRoot(mapConfig),
  ]
})
export class ProfileModule { }
