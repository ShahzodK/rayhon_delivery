import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProfileService } from '../../services/profile.service';
import { fetchAddresses } from 'src/app/redux/actions/address.actions';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CommonKey } from 'src/app/shared/consts/commonKey';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss']
})
export class LocationPageComponent implements OnInit, OnDestroy {
  public map: any;
  @ViewChild('yamaps') mapElement!: ElementRef;
  @ViewChild('suggestInput') suggestInput!: ElementRef;
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();
  private searchSubject = new Subject<string>();

  public possibleLocations: {latitude: number, longitude: number, display_name: string}[] = [];

  public errorMsg = '';

  public isLocationButtonDisabled = false;

  constructor(
              private profileService: ProfileService,
              private store: Store,
              public location: Location,
              private router: Router) {}

  ngOnInit(): void {
    window.scrollTo(0,0);
    ymaps.ready().then(() => {
      this.profileService.createMap(this.map);
      this.profileService.map.setBounds(this.profileService.map.geoObjects.getBounds(), {
        checkZoomRange: true,
        zoomMargin: 1,
      }).then(() => { 
          if(this.profileService.map.getZoom() > 10) {
            this.profileService.map.setZoom(13);
        }});  
    });

    this.profileService.coords$.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(300),
      switchMap((data) => this.profileService.geocode(data))
      ).subscribe((data) => {
      this.suggestInput.nativeElement.value = data.display_name;
    });

    this.searchSubject.pipe(
      debounceTime(300),
      takeUntil(this.unsubscribe$),
      switchMap(() => {
        return this.profileService.reverseGeocode(this.suggestInput.nativeElement.value);
      })
    ).subscribe(locations => {
      this.possibleLocations = locations;
    });
  }

  public locationForm = new FormGroup({
    locationAddress: new FormControl<string>('', [
      Validators.required
    ]),
    locationName: new FormControl<string>('', [
      Validators.required
    ])
  })

  public onSubmit() {
    if(this.locationForm.valid ||
      (this.locationForm.get('locationName')!.valid &&
      (this.profileService.latitude !== CommonKey.TASHKENT_LATITUDE_CENTER ||
      this.profileService.longitude !== CommonKey.TASHKENT_LONGITUDE_CENTER) &&
      this.profileService.latitude && this.profileService.longitude)) {
      this.isLocationButtonDisabled = true;
      const profileValues = {
        name: this.locationForm.get('locationName')!.value!,
        is_default: this.profileService.addressesCount > 0 ? false : true,
        latitude: this.profileService.latitude,
        longitude: this.profileService.longitude
      }
      this.profileService.createAddress(profileValues).subscribe({
        next: (data) => {
        console.log(data)
        this.isLocationButtonDisabled = false;
        console.log(data);
        this.store.dispatch(fetchAddresses());
        this.router.navigate(['/home']);
        this.profileService.latitude = CommonKey.TASHKENT_LATITUDE_CENTER;
        this.profileService.longitude = CommonKey.TASHKENT_LONGITUDE_CENTER;
      },
      error: (error) => {
        this.isLocationButtonDisabled = false;
        this.locationForm.controls.locationAddress.setErrors({
          unsupportedLocation: true
        })
        this.errorMsg = error.error.message;
        console.log(error);
      }
    })
    }
  }

  public onInputChange() {
    this.searchSubject.next('');
  }

  public sendAdress(location: {latitude: number, longitude: number, display_name: string}) {
    this.profileService.coords.next({
      lat: location.latitude,
      lng: location.longitude
    });
    this.profileService.myPlacemark.geometry.setCoordinates([location.latitude,location.longitude]);
    this.possibleLocations = [];
    this.profileService.map.setBounds(this.profileService.map.geoObjects.getBounds(), {
      checkZoomRange: true,
      zoomMargin: 1,
    }).then(() => { 
        if(this.profileService.map.getZoom() > 10) {
          this.profileService.map.setZoom(16);
      }});
  }

  public goBack() {
    this.location.back()
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
    this.profileService.coords.next({
      lat: CommonKey.TASHKENT_LATITUDE_CENTER,
      lng: CommonKey.TASHKENT_LONGITUDE_CENTER
    });
  }
}
