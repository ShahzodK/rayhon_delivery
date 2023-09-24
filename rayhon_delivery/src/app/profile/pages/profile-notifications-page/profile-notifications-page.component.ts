import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-notifications-page',
  templateUrl: './profile-notifications-page.component.html',
  styleUrls: ['./profile-notifications-page.component.scss']
})
export class ProfileNotificationsPageComponent {

  @ViewChild('generalNotification') public generalNotification!: ElementRef;
  @ViewChild('sound') public sound!: ElementRef;
  @ViewChild('vibration') public vibration!: ElementRef;
  @ViewChild('specialOffers') public specialOffers!: ElementRef;
  @ViewChild('payments') public payments!: ElementRef;
  @ViewChild('updates') public updates!: ElementRef;
  @ViewChild('newServices') public newServices!: ElementRef;
  @ViewChild('newAdvices') public newAdvices!: ElementRef;

  constructor(public location: Location) {}

  public notificationForm = new FormGroup({
    generalNotification: new FormControl<boolean>(false),
    sound: new FormControl<boolean>(false),
    vibration: new FormControl<boolean>(false),
    specialOffers: new FormControl<boolean>(false),
    payments: new FormControl<boolean>(false),
    updates: new FormControl<boolean>(false),
    newServices: new FormControl<boolean>(false),
    newAdvices: new FormControl<boolean>(false)
  })

  public updatePreferences() {
    this.notificationForm.patchValue({
      generalNotification: this.generalNotification.nativeElement.checked,
      sound: this.sound.nativeElement.checked,
      vibration: this.vibration.nativeElement.checked,
      specialOffers: this.specialOffers.nativeElement.checked,
      payments: this.payments.nativeElement.checked,
      updates: this.updates.nativeElement.checked,
      newServices: this.newServices.nativeElement.checked,
      newAdvices: this.newAdvices.nativeElement.checked
    });
    const profileValues = {
      generalNotification: this.notificationForm.value.generalNotification,
      sound: this.notificationForm.value.sound,
      vibration: this.notificationForm.value.vibration,
      specialOffers: this.notificationForm.value.specialOffers,
      payments: this.notificationForm.value.payments,
      updates: this.notificationForm.value.updates,
      newServices: this.notificationForm.value.newServices,
      newAdvices: this.notificationForm.value.newAdvices
    }
    console.log(profileValues)
  }

}
