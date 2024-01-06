import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverInformationPageComponent } from './pages/driver-information-page/driver-information-page.component';
import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { RateDriverPageComponent } from './pages/rate-driver-page/rate-driver-page.component';
import { RateCafePageComponent } from './pages/rate-cafe-page/rate-cafe-page.component';
import { BasketPageComponent } from './pages/basket-page/basket-page.component';
import { CheckoutOrderPageComponent } from './pages/checkout-order-page/checkout-order-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { PreOrderPageComponent } from './pages/pre-order-page/pre-order-page.component';
import { TrackOrderPageComponent } from './pages/track-order-page/track-order-page.component';
import { EditFoodModalComponent } from './components/edit-food-modal/edit-food-modal.component';
import { PaymentMethodsPageComponent } from './pages/payment-methods-page/payment-methods-page.component';



@NgModule({
  declarations: [
    DriverInformationPageComponent,
    RateDriverPageComponent,
    RateCafePageComponent,
    BasketPageComponent,
    CheckoutOrderPageComponent,
    OrdersPageComponent,
    PreOrderPageComponent,
    TrackOrderPageComponent,
    EditFoodModalComponent,
    PaymentMethodsPageComponent,
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
