import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProfileService } from '../../services/profile.service';
import { fetchAddresses } from 'src/app/redux/actions/address.actions';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss']
})
export class LocationPageComponent implements OnInit {
  public map: any;
  public latitude = 41.311086;
  public longitude = 69.279651;
  @ViewChild('yamaps') mapElement!: ElementRef;

  public errorMsg = '';

  constructor(
              private profileService: ProfileService,
              private store: Store) {}

  ngOnInit(): void {
    ymaps.ready().then(() => this.createMap());
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
    if(this.locationForm.valid || (this.locationForm.get('locationName')!.valid && this.latitude && this.longitude)) {
      const profileValues = {
        name: this.locationForm.get('locationName')!.value!,
        is_default: true,
        latitude: this.latitude,
        longitude: this.longitude
      }
      console.log(profileValues)
      this.profileService.sendAddress(profileValues).subscribe((data) => {
        if(data.data) {
          console.log(data);
          this.store.dispatch(fetchAddresses())
        }
        else if(data.error) {
          this.locationForm.controls.locationAddress.setErrors({
            unsupportedLocation: true
          })
          this.errorMsg = data.error.message;
        }
      })
    }
  }

  public createMap(): void {
    let tashkentCityCoords = [
                              [41.536747, 68.757843, 41.563500, 69.530394],
                              [40.970277, 69.730380, 40.970277, 69.730380],
                             ] 
    this.map = new ymaps.Map('map', {
      center: [this.latitude, this.longitude],
      zoom: 14,
      controls: ['zoomControl',  'fullscreenControl', 'geolocationControl'],
    }, {
      suppressMapOpenBlock: true,
      restrictMapArea: tashkentCityCoords,
    });
    let suggestViewInput = document.querySelector('#suggest') as HTMLInputElement;
    let suggestView: any = new ymaps.SuggestView('suggest');
    let myPlacemark: any = new ymaps.Placemark([this.latitude, this.longitude], {}, {
      iconLayout: 'default#image',
      iconImageHref: '../../../../assets/icons/user-location.svg',
    });   
    let myPlacemarkAddress: any;
    this.map.geoObjects.add(myPlacemark)
    suggestView.events.add('select', (e: any) =>  {
          ymaps.geocode(e.get('item').value)
          .then( (res: any) => {
                        this.map.setBounds(res.geoObjects.get(0).properties.get('boundedBy'));
            })
        });
    function getAddress(coords: any) {
        myPlacemark.properties.set('iconCaption', 'searching...');
        ymaps.geocode(coords).then((res: any) => {
            let firstGeoObject = res.geoObjects.get(0);

            myPlacemark.properties
                .set({
                    // Forming a string with the object's data.
                    iconCaption: [
                        // The name of the municipality or the higher territorial-administrative formation.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Getting the path to the toponym; if the method returns null, then requesting the name of the building.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // Specifying a string with the address of the object as the balloon content.
                    balloonContent: firstGeoObject.getAddressLine()
                });
                suggestViewInput.value = firstGeoObject.getAddressLine();
                console.log(suggestViewInput.value)
        });
    }

    this.map.events.add('boundschange', (e : any) => {
      myPlacemark.geometry.setCoordinates(e.get('newCenter'));
      getAddress(myPlacemarkAddress)
    });

    this.map.events.add('actiontickcomplete', (e: any) => {
      const { globalPixelCenter, zoom } = e.get('tick');
      myPlacemarkAddress = this.map.options.get('projection').fromGlobalPixels(globalPixelCenter, zoom);
      myPlacemark.geometry.setCoordinates(myPlacemarkAddress);
      this.latitude = myPlacemarkAddress[0];
      this.longitude = myPlacemarkAddress[1];
    });
  }
}
