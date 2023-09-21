import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverInformationPageComponent } from './pages/driver-information-page/driver-information-page.component';
import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';



@NgModule({
  declarations: [
    DriverInformationPageComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
