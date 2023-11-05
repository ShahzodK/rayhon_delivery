import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss']
})
export class NotificationsPageComponent {

  constructor(public location: Location) {}

}
