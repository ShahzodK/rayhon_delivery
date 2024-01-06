import { Component, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectChosenOrder } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-driver-information-page',
  templateUrl: './driver-information-page.component.html',
  styleUrls: ['./driver-information-page.component.scss']
})
export class DriverInformationPageComponent {

  @ViewChild('driverNum') public driverNum!: ElementRef;

  public isNumCopied = false;

  public chosenOrder$ = this.store.select(selectChosenOrder);

  public experienceInMonth = false;

  constructor(
              public location: Location,
              private store: Store
              ) {}

  public copyDriverNum() {
    const num = this.driverNum.nativeElement.textContent;
    navigator.clipboard.writeText(num);
    this.isNumCopied = true;
  }

  public getDriverExperience(date: string) {
    let experienceInMonth = Math.floor((+new Date() - +new Date(date)) / 1000 / 60 / 60 / 24 / 30)
    if(experienceInMonth >= 12) {
      let experienceInYear = experienceInMonth / 12;
      this.experienceInMonth = false;
      return experienceInYear;
    }
    else {
      this.experienceInMonth = true;
      return experienceInMonth;
    }
  }

  public getDriverStartedDate(inputDate: string) {
    const date = new Date(inputDate);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();

    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
  }

}
