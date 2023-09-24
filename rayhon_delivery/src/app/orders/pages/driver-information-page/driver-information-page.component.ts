import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-driver-information-page',
  templateUrl: './driver-information-page.component.html',
  styleUrls: ['./driver-information-page.component.scss']
})
export class DriverInformationPageComponent {

  constructor(public location: Location) {}

}
