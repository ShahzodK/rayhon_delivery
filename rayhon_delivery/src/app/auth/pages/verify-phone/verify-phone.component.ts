import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { AngularDeviceInformationService } from 'angular-device-information';
import { AuthService } from '../../services/auth.service';
import { selectAuthData } from 'src/app/redux/selectors/app.selectors';
import * as uuid from 'uuid';

/// <reference types="user-agent-data-types" />

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent {

  constructor(
              public store: Store,
              private deviceInformationService: AngularDeviceInformationService,
              private authService: AuthService
              ) {}

  @ViewChild('input1') public firstNumInput!: ElementRef;
  @ViewChild('input2') public secondNumInput!: ElementRef;
  @ViewChild('input3') public thirdNumInput!: ElementRef;
  @ViewChild('input4') public fourthNumInput!: ElementRef;
  @ViewChild('input5') public fifthNumInput!: ElementRef;
  @ViewChild('input6') public sixthNumInput!: ElementRef;

  public authData$ = this.store.select(selectAuthData);
  
  public time = 60000;

  public interval = setInterval(() => {
  this.time -= 1000;
    if(this.time <= 0) {
      clearInterval(this.interval);
    } 
  }, 1000);

  public verifyPhoneForm = new FormGroup({
    firstNum: new FormControl<string>('', [
      Validators.required
    ]),
    secondNum: new FormControl<string>('', [
      Validators.required
    ]),
    thirdNum: new FormControl<string>('', [
      Validators.required
    ]),
    fourthNum: new FormControl<string>('', [
      Validators.required
    ]),
    fifthNum: new FormControl<string>('', [
      Validators.required
    ]),
    sixthNum: new FormControl<string>('', [
      Validators.required
    ])
  })

  public verify() {
    if(this.verifyPhoneForm.valid) {
      const smsCode = this.verifyPhoneForm.value.firstNum!
      + this.verifyPhoneForm.value.secondNum
      + this.verifyPhoneForm.value.thirdNum
      + this.verifyPhoneForm.value.fourthNum
      + this.verifyPhoneForm.value.fifthNum
      + this.verifyPhoneForm.value.sixthNum;

      this.authData$.pipe(
        switchMap(authData => {
          const profileValues = {
            phone: authData.phoneNum,
            otp: smsCode + 56,
            otp_job_id: authData.otp_job_id,
            Device: {
              id: uuid.v4(),
              name: 'name',
              platform: this.deviceInformationService.getDeviceInfo().os,
              version: this.deviceInformationService.getDeviceInfo().osVersion,
              build: 'build'
            }
          }
          return this.authService.verifyPhoneNum(profileValues);
        })
      ).subscribe(data => {
        console.log(data);
        console.log(this.deviceInformationService.getDeviceInfo())
      })
    }
  }

  onInputKeyUp(event: KeyboardEvent, inputName: string) {
    const inputValue = this.verifyPhoneForm.get(inputName)?.value;
    if (event.key === 'Backspace' && inputValue === '') {
      this.focusPreviousInput(inputName);
    } else if (inputValue.length === 1) {
      this.focusNextInput(inputName);
    }
  }

  focusNextInput(currentInputName: string) {
    switch (currentInputName) {
      case 'firstNum':
        this.secondNumInput.nativeElement.focus();
        break;
      case 'secondNum':
        this.thirdNumInput.nativeElement.focus();
        break;
      case 'thirdNum':
        this.fourthNumInput.nativeElement.focus();
        break;
      case 'fourthNum':
        this.fifthNumInput.nativeElement.focus();
        break;
      case 'fifthNum':
        this.sixthNumInput.nativeElement.focus();
        break;
    }
  }

  focusPreviousInput(currentInputName: string) {
    switch (currentInputName) {
      case 'secondNum':
        this.firstNumInput.nativeElement.focus();
        break;
      case 'thirdNum':
        this.secondNumInput.nativeElement.focus();
        break;
      case 'fourthNum':
        this.thirdNumInput.nativeElement.focus();
        break;
      case 'fifthNum':
        this.fourthNumInput.nativeElement.focus();
        break;
      case 'sixthNum':
        this.fifthNumInput.nativeElement.focus();
        break;
    }
  }
  

}
