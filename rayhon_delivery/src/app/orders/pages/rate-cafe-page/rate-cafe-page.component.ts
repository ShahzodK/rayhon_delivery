import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rate-cafe-page',
  templateUrl: './rate-cafe-page.component.html',
  styleUrls: ['./rate-cafe-page.component.scss']
})
export class RateCafePageComponent {

  constructor(public location: Location) {}
}
