import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverInformationPageComponent } from './pages/driver-information-page/driver-information-page.component';
import { RateDriverPageComponent } from './pages/rate-driver-page/rate-driver-page.component';

const routes: Routes = [
  { path: 'driver-info', component: DriverInformationPageComponent },
  { path: 'rate-driver', component: RateDriverPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule { }
