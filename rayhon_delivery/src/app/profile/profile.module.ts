import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { LocationPageComponent } from './pages/location-page/location-page.component';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { CommonKey } from '../shared/consts/commonKey';

const mapConfig: YaConfig = {
  apikey: '275222c6-ec7c-4bf1-92a5-e0de7a7cc878',
  lang: 'ru_RU'
};

@NgModule({
  declarations: [
    ProfilePageComponent,
    LocationPageComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    AngularYandexMapsModule.forRoot(mapConfig)
  ]
})
export class ProfileModule { }
