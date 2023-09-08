import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/auth/models/user.model';
import { CommonKey } from 'src/app/shared/consts/commonKey';
import { CommonUrl } from 'src/app/shared/consts/commonUrl';
import { IAddressRequest } from '../models/addressRequest.model';
import { IAddresses } from '../models/addresses.model';
import { IAddress } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public addressesCount = 0;

  public latitude = CommonKey.TASHKENT_LATITUDE_CENTER;
  public longitude = CommonKey.TASHKENT_LONGITUDE_CENTER;

  public createMap(map: any): void {
    let tashkentCityCoords = [
                              [41.536747, 68.757843, 41.563500, 69.530394],
                              [40.970277, 69.730380, 40.970277, 69.730380],
                             ] 
    map = new ymaps.Map('map', {
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
    map.geoObjects.add(myPlacemark)
    suggestView.events.add('select', (e: any) =>  {
          ymaps.geocode(e.get('item').value)
          .then( (res: any) => {
                        map.setBounds(res.geoObjects.get(0).properties.get('boundedBy'));
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
        });
    }

    map.events.add('boundschange', (e : any) => {
      myPlacemark.geometry.setCoordinates(e.get('newCenter'));
      getAddress(myPlacemarkAddress)
    });

    map.events.add('actiontickcomplete', (e: any) => {
      const { globalPixelCenter, zoom } = e.get('tick');
      myPlacemarkAddress = map.options.get('projection').fromGlobalPixels(globalPixelCenter, zoom);
      myPlacemark.geometry.setCoordinates(myPlacemarkAddress);
      this.latitude = myPlacemarkAddress[0];
      this.longitude = myPlacemarkAddress[1];
    });
  }

  constructor(
              private http : HttpClient
              ) { }

  public updateUser(data: {first_name: string, last_name: string, language: string}) {
    return this.http.put<IUser>(CommonUrl.MAIN_URL + CommonUrl.USER_URL, JSON.stringify(data),  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    });
  }

  public uploadProfileImage(data: any) {
    return this.http.post<IUser>(CommonUrl.MAIN_URL + CommonUrl.UPLOAD_IMG, data , {
      headers: new HttpHeaders({
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!),
      })
    });
  }

  public getAddresses() {
    return this.http.get<IAddresses>(`${CommonUrl.MAIN_URL + CommonUrl.ADDRESSES_URL}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!),
      })
    });
  }

  public createAddress(data: IAddressRequest) {
    return this.http.post<IAddresses>(CommonUrl.MAIN_URL + CommonUrl.ADDRESSES_URL, data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!),
      })
    });
  }

  public updateAddress(data: {id: string, name: string, is_default: boolean}) {
    return this.http.put<IAddress>(`${CommonUrl.MAIN_URL + CommonUrl.ADDRESSES_URL}/${data.id}` , data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!),
      })
    });
  }

  public deleteAddress (addressId: string) {
    return this.http.delete<IUser>(`${CommonUrl.MAIN_URL + CommonUrl.ADDRESSES_URL}/${addressId}` , {
      headers: new HttpHeaders({
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!),
      })
    });
  }
}
