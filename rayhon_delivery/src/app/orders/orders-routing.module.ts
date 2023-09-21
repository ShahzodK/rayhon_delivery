import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverInformationPageComponent } from './pages/driver-information-page/driver-information-page.component';

const routes: Routes = [
  { path: 'driver-info', component: DriverInformationPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule { }
