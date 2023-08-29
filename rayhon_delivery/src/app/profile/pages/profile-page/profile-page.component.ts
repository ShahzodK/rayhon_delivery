import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { Store } from '@ngrx/store';
import { selectUserData } from 'src/app/redux/selectors/app.selectors';
import { IUser } from 'src/app/auth/models/user.model';
import { fetchUser } from 'src/app/redux/actions/auth.actions';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  public maxDate: Date;

  public userData!: IUser["data"];

  public uploadedImg!: File;

  public userData$ = this.store.select(selectUserData);


  constructor(
              private profileService: ProfileService,
              private store: Store,
              private router: Router
              ) {
    this.maxDate = new Date();
  }
  
  ngOnInit() {
    this.store.dispatch(fetchUser())
    this.userData$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      if(data) {
        this.userData = data;
        if(this.userData.first_name) {
          this.profileForm.get('name')?.setValue(`${this.userData!.first_name} ${this.userData!.last_name}`);
        }
      }
    });
  }



  public profileForm = new FormGroup({
    profileImg: new FormControl<string>(''),
    name: new FormControl<string>('', [
      Validators.required
    ])
  })

  public onSubmit() {
    if(this.profileForm.valid) {
      const name = this.profileForm.get('name')!.value!.split(' ');
      const profileValues = {
        first_name: name[0],
        last_name: name.length > 1 ? name[1] : ' ',
        language: this.userData!.language 
      }
      if(this.userData?.first_name !== profileValues.first_name || this.userData.last_name !== profileValues.last_name) {
        this.profileService.updateUser(profileValues).pipe(
          takeUntil(this.unsubscribe$),
        ).subscribe((data) => {
          if(data.data) {
            this.router.navigate(['/profile/location']);
            this.store.dispatch(fetchUser());
          }
        })
      }
      else {
        this.router.navigate(['/profile/location'])
      }
    }
  }

  public saveUploadedImg(event: any) {
    const f: File[] = (event.srcElement! || event!.target).files;
    this.uploadedImg = f[0];
    const formData = new FormData();
    formData.append('image', this.uploadedImg);
    this.profileService.uploadProfileImage(formData).pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe((data) => {
      console.log(data);
      this.store.dispatch(fetchUser())
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }


}
