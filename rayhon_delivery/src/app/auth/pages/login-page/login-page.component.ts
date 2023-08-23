import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnDestroy {

  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
              private authService: AuthService,
              private router: Router
              ) {}

  public authForm = new FormGroup({
    phoneNum: new FormControl<string>('', [
      Validators.required
    ])
  });

  public login() {
    if(this.authForm.valid) {
      let profileValues = {
        phone: '998' + this.authForm.value.phoneNum!,
        language: 'ru'
      }
      this.authService.login(profileValues).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe({
        next(data) {
          console.log(data);
        },
        error(err) {
          console.error(err.error.message, err.error.code)
        }
      })
      console.log(profileValues)
    }
  }

  public verifyOtp() {
    
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
