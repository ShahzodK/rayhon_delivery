import { Component, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-driver-information-page',
  templateUrl: './driver-information-page.component.html',
  styleUrls: ['./driver-information-page.component.scss']
})
export class DriverInformationPageComponent {

  @ViewChild('driverNum') public driverNum!: ElementRef;

  public isNumCopied = false;

  constructor(public location: Location) {}

  public copyDriverNum() {
    const num = this.driverNum.nativeElement.textContent;
    navigator.clipboard.writeText(num);
    this.isNumCopied = true;
  }

}
