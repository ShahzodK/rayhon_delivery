import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent {

  constructor(public location: Location) {}
}
