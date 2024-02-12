import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fetchNotificationPreferences, updateNotificationPreferences } from 'src/app/redux/actions/notification.actions';
import { selectNotification } from 'src/app/redux/selectors/app.selectors';
import { INotificationsSettings } from '../../models/notificationSettings.model';

@Component({
  selector: 'app-profile-notifications-page',
  templateUrl: './profile-notifications-page.component.html',
  styleUrls: ['./profile-notifications-page.component.scss']
})
export class ProfileNotificationsPageComponent implements OnInit {

  @ViewChild('general') public general!: ElementRef;
  @ViewChild('sound') public sound!: ElementRef;
  @ViewChild('vibrate') public vibrate!: ElementRef;
  @ViewChild('promotions') public promotions!: ElementRef;
  @ViewChild('special_offers') public special_offers!: ElementRef;
  @ViewChild('payment') public payment!: ElementRef;
  @ViewChild('new_release') public new_release!: ElementRef;
  @ViewChild('new_service') public new_service!: ElementRef;
  @ViewChild('new_tutorial') public new_tutorial!: ElementRef;

  public selectNotification = this.store.select(selectNotification);

  constructor(
              public location: Location,
              private store: Store,
              private fb: FormBuilder
             ) {
              this.notificationForm = new FormGroup({});
            }

  ngOnInit() {
    window.scrollTo(0,0);
    this.store.dispatch(fetchNotificationPreferences());
    this.store.select(selectNotification).subscribe((notifications) => {
      // this.notificationForm.patchValue(
      //   notificationData
      // );

      if (notifications) {
        this.buildForm(notifications);
      }
      console.log(notifications)
    });  
  }

  private buildForm(notifications: INotificationsSettings[]) {
    const formControls: any = {};

    notifications.forEach((notification: INotificationsSettings) => {
      formControls[notification.key] = new FormControl(notification.state);
    });

    this.notificationForm = new FormGroup(formControls);
  }

  public notificationForm;

  public updatePreferences(notification: INotificationsSettings) {
    const profileValues: any = {};

    // Object.keys(this.notificationForm.controls).forEach(controlName => {
    //   profileValues[controlName] = this.notificationForm.get(controlName)?.value || false;
    // });
    // this.notificationForm.patchValue({
    //   general: this.general.nativeElement.checked,
    //   sound: this.sound.nativeElement.checked,
    //   vibrate: this.vibrate.nativeElement.checked,
    //   promotions: this.promotions.nativeElement.checked,
    //   special_offers: this.special_offers.nativeElement.checked,
    //   payment: this.payment.nativeElement.checked,
    //   new_release: this.new_release.nativeElement.checked,
    //   new_service: this.new_service.nativeElement.checked,
    //   new_tutorial: this.new_tutorial.nativeElement.checked
    // });
    this.notificationForm.patchValue({
      notification,['key']: notification['state']
    })  
    // this.notificationForm.patchValue({
    //   notification['key']: notification.state!!
    // })
    // const profileValues: INotificationsSettings = {
    //   general: this.notificationForm.value.general!,
    //   sound: this.notificationForm.value.sound!,
    //   vibrate: this.notificationForm.value.vibrate!,
    //   promotions: this.notificationForm.value.promotions!,
    //   special_offers: this.notificationForm.value.special_offers!,
    //   payment: this.notificationForm.value.payment!,
    //   new_release: this.notificationForm.value.new_release!,
    //   new_service: this.notificationForm.value.new_service!,
    //   new_tutorial: this.notificationForm.value.new_tutorial!
    // }
    console.log(this.notificationForm.value)
    // this.store.dispatch(updateNotificationPreferences(profileValues))
  }

}
