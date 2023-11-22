import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { fetchAddresses } from 'src/app/redux/actions/address.actions';
import { CommonKey } from 'src/app/shared/consts/commonKey';
import { ProfileService } from '../../services/profile.service';
import { Subject, filter, of, switchMap, takeUntil } from 'rxjs';
import { selectAddresses } from 'src/app/redux/selectors/app.selectors';
import { IAddress } from '../../models/address.model';

@Component({
  selector: 'app-update-location-page',
  templateUrl: './update-location-page.component.html',
  styleUrls: ['./update-location-page.component.scss']
})
export class UpdateLocationPageComponent implements OnInit, OnDestroy {
  public map: any;
  @ViewChild('yamaps') mapElement!: ElementRef;

  public errorMsg = '';
  public unsubscribe$ = new Subject();
  public id!: string;
  public currentAddress!: IAddress;
  public selectAddresses$ = this.store.select(selectAddresses);

  constructor(
              private profileService: ProfileService,
              private store: Store,
              public location: Location,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    ymaps.ready().then(() => this.profileService.createMap(this.map));

    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.id = params.get('id')!;
    });
    console.log(this.profileService.latitude)

    this.selectAddresses$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
      data.forEach((item) => {
        if(item.id == this.id) {
          this.currentAddress = item;
          this.profileService.latitude = item.latitude;
          this.profileService.longitude = item.longitude;
          this.locationForm.get('locationAddress')?.setValue(this.currentAddress.address);
          this.locationForm.get('locationName')?.setValue(this.currentAddress.name);
        }
      })
    })
  }

  public locationForm = new FormGroup({
    locationAddress: new FormControl<string>('', [
      Validators.required
    ]),
    locationName: new FormControl<string>('', [
      Validators.required
    ])
  })

  public updateAddress() {
    const profileValues = {
      name: this.locationForm.get('locationName')!.value!,
      is_default: this.currentAddress.is_default,
      latitude: this.profileService.latitude,
      longitude: this.profileService.longitude
    }
    console.log(this.profileService.latitude)
    console.log(this.profileService.latitude == this.currentAddress.latitude)
    if (this.profileService.latitude !== this.currentAddress.latitude
       || this.profileService.longitude !== this.currentAddress.longitude) {
        this.profileService.deleteAddress(this.currentAddress.id).pipe(
          takeUntil(this.unsubscribe$),
          switchMap(() => this.profileService.createAddress(profileValues))
        ).subscribe(
          {
            next: (data) => {
              this.router.navigate(['/home']);
              this.profileService.latitude = CommonKey.TASHKENT_LATITUDE_CENTER;
              this.profileService.longitude = CommonKey.TASHKENT_LONGITUDE_CENTER;
            },
            error: (error) => {
              this.locationForm.controls.locationAddress.setErrors({
                unsupportedLocation: true
              })
              this.errorMsg = error.error.message;
            }
          }
        )
      }
      else if (this.profileService.latitude == this.currentAddress.latitude
              && this.profileService.longitude == this.currentAddress.longitude) {
          this.profileService.updateAddress(
            { id: this.currentAddress.id,
              name: this.locationForm.get('locationName')!.value!,
              is_default: profileValues.is_default
            }).pipe(
                    takeUntil(this.unsubscribe$)
                    ).subscribe(
                      {
                        next: (data) => {
                          console.log(data);
                          this.router.navigate(['/home']),
                          this.profileService.latitude = CommonKey.TASHKENT_LATITUDE_CENTER;
                          this.profileService.longitude = CommonKey.TASHKENT_LONGITUDE_CENTER;
                        },
                        error: (error) => {
                          this.locationForm.controls.locationAddress.setErrors({
                            unsupportedLocation: true
                          })
                          this.errorMsg = error.error.message;
                        }
                      }
                )
        }
        this.store.dispatch(fetchAddresses())
  }

  public goBack() {
    this.location.back()
  }

  public deleteAddress() {
    this.selectAddresses$.pipe(
      takeUntil(this.unsubscribe$),
      switchMap((addresses) => {
        console.log(addresses.length)
        if(addresses.length == 1) {
          return of('cancel');
        }
        else {
          return this.profileService.deleteAddress(this.currentAddress.id)
        }
      }),
      filter((data) => data !== 'cancel')
    ).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/home']);
      this.store.dispatch(fetchAddresses())
    })
  }

  ngOnDestroy(): void {
      
  }
}
