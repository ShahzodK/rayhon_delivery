import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { saveLoginDataSuccess } from 'src/app/redux/actions/auth.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnDestroy {


  public unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public isLoginButtonDisabled = false;

  constructor(
              public authService: AuthService,
              private router: Router,
              private store: Store
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
        language: 'en'
      }
      this.isLoginButtonDisabled = true;
      this.authService.login(profileValues).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe({
        next: (data) => {
        console.log(data)
        this.isLoginButtonDisabled = false;
        this.store.dispatch(saveLoginDataSuccess({phoneNum: '+' + profileValues.phone, otp_job_id: data.otp_job_id}))
        this.router.navigate(['/auth/verify_num']);
      },
      error: (error) => {
        this.isLoginButtonDisabled = false;
        console.log(error);
        console.log(profileValues)
      }})
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
