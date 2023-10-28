import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss']
})
export class BasketPageComponent {

  constructor(public location: Location) {}
}
