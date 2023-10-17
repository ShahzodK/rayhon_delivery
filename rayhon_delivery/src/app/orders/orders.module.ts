import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverInformationPageComponent } from './pages/driver-information-page/driver-information-page.component';
import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { RateDriverPageComponent } from './pages/rate-driver-page/rate-driver-page.component';
import { RateCafePageComponent } from './pages/rate-cafe-page/rate-cafe-page.component';



@NgModule({
  declarations: [
    DriverInformationPageComponent,
    RateDriverPageComponent,
    RateCafePageComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
  ],
  providers: [
  ]
})
export class OrdersModule { }
