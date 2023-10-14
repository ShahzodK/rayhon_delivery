import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PaymentPageComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule
  ]
})
export class PaymentModule { }
