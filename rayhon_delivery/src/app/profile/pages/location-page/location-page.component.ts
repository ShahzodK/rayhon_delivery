import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProfileService } from '../../services/profile.service';
import { fetchAddresses } from 'src/app/redux/actions/address.actions';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CommonKey } from 'src/app/shared/consts/commonKey';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss']
})
export class LocationPageComponent implements OnInit {
  public map: any;
  @ViewChild('yamaps') mapElement!: ElementRef;

  public errorMsg = '';

  public isLocationButtonDisabled = false;

  constructor(
              private profileService: ProfileService,
              private store: Store,
              public location: Location,
              private router: Router) {}

  ngOnInit(): void {
    ymaps.ready().then(() => this.profileService.createMap(this.map));
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
        this.isLocationButtonDisabled = false;
        if(data.data) {
          console.log(data);
          this.store.dispatch(fetchAddresses());
          this.router.navigate(['/home']);
          this.profileService.latitude = CommonKey.TASHKENT_LATITUDE_CENTER;
          this.profileService.longitude = CommonKey.TASHKENT_LONGITUDE_CENTER;
        }
        else if(data.error) {
          this.locationForm.controls.locationAddress.setErrors({
            unsupportedLocation: true
          })
          this.errorMsg = data.error.message;
        }
      },
      error: (error) => {
        this.isLocationButtonDisabled = false;
        console.log(error);
      }
    })
    }
  }

  // public createMap(): void {
  //   let tashkentCityCoords = [
  //                             [41.536747, 68.757843, 41.563500, 69.530394],
  //                             [40.970277, 69.730380, 40.970277, 69.730380],
  //                            ] 
  //   this.map = new ymaps.Map('map', {
  //     center: [this.latitude, this.longitude],
  //     zoom: 14,
  //     controls: ['zoomControl',  'fullscreenControl', 'geolocationControl'],
  //   }, {
  //     suppressMapOpenBlock: true,
  //     restrictMapArea: tashkentCityCoords,
  //   });
  //   let suggestViewInput = document.querySelector('#suggest') as HTMLInputElement;
  //   let suggestView: any = new ymaps.SuggestView('suggest');
  //   let myPlacemark: any = new ymaps.Placemark([this.latitude, this.longitude], {}, {
  //     iconLayout: 'default#image',
  //     iconImageHref: '../../../../assets/icons/user-location.svg',
  //   });   
  //   let myPlacemarkAddress: any;
  //   this.map.geoObjects.add(myPlacemark)
  //   suggestView.events.add('select', (e: any) =>  {
  //         ymaps.geocode(e.get('item').value)
  //         .then( (res: any) => {
  //                       this.map.setBounds(res.geoObjects.get(0).properties.get('boundedBy'));
  //           })
  //       });
  //   function getAddress(coords: any) {
  //       myPlacemark.properties.set('iconCaption', 'searching...');
  //       ymaps.geocode(coords).then((res: any) => {
  //           let firstGeoObject = res.geoObjects.get(0);

  //           myPlacemark.properties
  //               .set({
  //                   // Forming a string with the object's data.
  //                   iconCaption: [
  //                       // The name of the municipality or the higher territorial-administrative formation.
  //                       firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
  //                       // Getting the path to the toponym; if the method returns null, then requesting the name of the building.
  //                       firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
  //                   ].filter(Boolean).join(', '),
  //                   // Specifying a string with the address of the object as the balloon content.
  //                   balloonContent: firstGeoObject.getAddressLine()
  //               });
  //               suggestViewInput.value = firstGeoObject.getAddressLine();
  //               console.log(suggestViewInput.value)
  //       });
  //   }

  //   this.map.events.add('boundschange', (e : any) => {
  //     myPlacemark.geometry.setCoordinates(e.get('newCenter'));
  //     getAddress(myPlacemarkAddress)
  //   });

  //   this.map.events.add('actiontickcomplete', (e: any) => {
  //     const { globalPixelCenter, zoom } = e.get('tick');
  //     myPlacemarkAddress = this.map.options.get('projection').fromGlobalPixels(globalPixelCenter, zoom);
  //     myPlacemark.geometry.setCoordinates(myPlacemarkAddress);
  //     this.latitude = myPlacemarkAddress[0];
  //     this.longitude = myPlacemarkAddress[1];
  //   });
  // }

  public goBack() {
    this.location.back()
  }
}
