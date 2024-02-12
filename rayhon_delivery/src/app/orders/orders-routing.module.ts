import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverInformationPageComponent } from './pages/driver-information-page/driver-information-page.component';
import { RateDriverPageComponent } from './pages/rate-driver-page/rate-driver-page.component';
import { RateCafePageComponent } from './pages/rate-cafe-page/rate-cafe-page.component';
import { BasketPageComponent } from './pages/basket-page/basket-page.component';
import { CheckoutOrderPageComponent } from './pages/checkout-order-page/checkout-order-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { PreOrderPageComponent } from './pages/pre-order-page/pre-order-page.component';
import { TrackOrderPageComponent } from './pages/track-order-page/track-order-page.component';
import { PaymentMethodsPageComponent } from './pages/payment-methods-page/payment-methods-page.component';
import { OrderDetailPageComponent } from './pages/order-detail-page/order-detail-page.component';

const routes: Routes = [
  { path: '', component: OrdersPageComponent},
  { path: 'track/:id', component: TrackOrderPageComponent},
  { path: 'driver-info/:id', component: DriverInformationPageComponent },
  { path: 'rate-driver', component: RateDriverPageComponent },
  { path: 'rate-cafe', component: RateCafePageComponent },
  { path: 'basket', component: BasketPageComponent},
  { path: 'checkout', component: CheckoutOrderPageComponent},
  { path: 'pre-order', component: PreOrderPageComponent },
  { path: 'payment-method', component: PaymentMethodsPageComponent },
  { path: 'order/:id', component: OrderDetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule { }
