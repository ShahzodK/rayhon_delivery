import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAuthData } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent {

  constructor(public store: Store) {}

  @ViewChild('input1') public firstNumInput!: ElementRef;
  @ViewChild('input2') public secondNumInput!: ElementRef;
  @ViewChild('input3') public thirdNumInput!: ElementRef;
  @ViewChild('input4') public fourthNumInput!: ElementRef;

  public authData = this.store.select(selectAuthData);
  
  public time = 6000;

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
    ])
  })

  public verify() {
    if(this.verifyPhoneForm.valid) {
      const smsCode = this.verifyPhoneForm.value.firstNum!
      + this.verifyPhoneForm.value.secondNum
      + this.verifyPhoneForm.value.thirdNum
      + this.verifyPhoneForm.value.fourthNum;
      const profileValues = {
        otp: smsCode
      }
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
    }
  }
  

}

