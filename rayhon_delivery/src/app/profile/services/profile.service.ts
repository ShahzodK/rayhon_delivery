import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/auth/models/user.model';
import { CommonKey } from 'src/app/shared/consts/commonKey';
import { CommonUrl } from 'src/app/shared/consts/commonUrl';
import { IAddressRequest } from '../models/addressRequest.model';
import { IAddresses } from '../models/addresses.model';
import { IAddress } from '../models/address.model';
import { IFavorites } from '../models/favorites.model';
import { INotificationsSettings } from '../models/notificationSettings.model';
import { IError } from 'src/app/shared/models/IError.model';
import { debounceTime, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { IFaq } from '../models/faq.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public addressesCount = 0;

  public latitude = CommonKey.TASHKENT_LATITUDE_CENTER;
  public longitude = CommonKey.TASHKENT_LONGITUDE_CENTER;
  public coords = new BehaviorSubject<{ lat: number, lng: number }>({
    lat: this.latitude,
    lng: this.longitude
  })
  public coords$ = this.coords.asObservable();

  public myPlacemark: any;
  public map: any;

  public createMap(map: any, isUpdate = false): void {
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
    this.myPlacemark = new ymaps.Placemark([this.latitude, this.longitude], {}, {
      iconLayout: 'default#image',
      iconImageHref: '../../../../assets/icons/user-location.svg',
    });
    if(!isUpdate) {
      this.myPlacemark.geometry.setCoordinates([CommonKey.TASHKENT_LATITUDE_CENTER, CommonKey.TASHKENT_LONGITUDE_CENTER]);

    }
    // let suggestViewInput = document.querySelector('#suggest') as HTMLInputElement;
    // let suggestView: any = new ymaps.SuggestView('suggest');
    let myPlacemarkAddress: any;
    // map.setBounds(res.geoObjects.get(0).properties.get('boundedBy'));

    this.map.geoObjects.add(this.myPlacemark);
    // suggestView.events.add('select', (e: any) =>  {
    //       ymaps.geocode(e.get('item').value)
    //       .then( (res: any) => {
    //         console.log(res)
    //       })
    // });
    // function getAddress(coords: any) {
    //     myPlacemark.properties.set('iconCaption', 'searching...');
    //     ymaps.geocode(coords).then((res: any) => {
    //         let firstGeoObject = res.geoObjects.get(0);

    //         myPlacemark.properties
    //             .set({
    //                 // Forming a string with the object's data.
    //                 iconCaption: [
    //                     // The name of the municipality or the higher territorial-administrative formation.
    //                     firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
    //                     // Getting the path to the toponym; if the method returns null, then requesting the name of the building.
    //                     firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
    //                 ].filter(Boolean).join(', '),
    //                 // Specifying a string with the address of the object as the balloon content.
    //                 balloonContent: firstGeoObject.getAddressLine()
    //             });
    //             suggestViewInput.value = firstGeoObject.getAddressLine();
    //     });
    // }

    this.map.events.add('boundschange', (e : any) => {
      this.myPlacemark.geometry.setCoordinates(e.get('newCenter'));
      // getAddress(myPlacemarkAddress)
    });

    this.map.events.add('actiontickcomplete', (e: any) => {
      const { globalPixelCenter, zoom } = e.get('tick');
      myPlacemarkAddress = this.map.options.get('projection').fromGlobalPixels(globalPixelCenter, zoom);
      this.myPlacemark.geometry.setCoordinates(myPlacemarkAddress);
      this.latitude = myPlacemarkAddress[0];
      this.longitude = myPlacemarkAddress[1];
      this.coords.next({
        lat: this.latitude,
        lng: this.longitude
      })
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
    return this.http.post<IUser>(CommonUrl.MAIN_URL + 'accounts/' + CommonUrl.UPLOAD_IMG, data , {
      headers: new HttpHeaders({
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!),
      })
    });
  }

  public getAddresses() {
    return this.http.get<IAddress[]>(`${CommonUrl.MAIN_URL + CommonUrl.ADDRESSES_URL}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!),
      })
    });
  }

  public createAddress(data: IAddressRequest) {
    return this.http.post<IAddress[]>(CommonUrl.MAIN_URL + CommonUrl.ADDRESSES_URL + '/', data, {
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

  public getFavorites() {
    return this.http.get<IFavorites['data']> (CommonUrl.MAIN_URL + CommonUrl.FAVORITE_URL, {
      headers: new HttpHeaders({
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!),
      })
    })
  }

  public getNotificationPreferences() {
    return this.http.get<INotificationsSettings> (CommonUrl.MAIN_URL + CommonUrl.NOTIFICATION_URL + '/settings', {
      headers: new HttpHeaders({
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!),
      })
    })
  }

  public updateNotificationPreferences(data: INotificationsSettings) {
    return this.http.put<INotificationsSettings> (CommonUrl.MAIN_URL + CommonUrl.NOTIFICATION_URL + '/settings', data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!),
      })
    })
  }

  public geocode(data: {lat: number, lng: number}) {
    console.log(data);
    return this.http.post<{latitude: number, longitude: number, display_name: string}>(`${CommonUrl.MAIN_URL + CommonUrl.ADDRESSES_URL}/action/geocode?lat=${data.lat}&lng=${data.lng}`, '', {
      headers: new HttpHeaders({
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!),
      })
    })
  }
  public reverseGeocode(address: string) {
    console.log(address);
    return this.http.post<{latitude: number, longitude: number, display_name: string}[]>(`${CommonUrl.MAIN_URL + CommonUrl.ADDRESSES_URL}/action/reverse-geocode?address=${address}`, '', {
      headers: new HttpHeaders({
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!),
      })
    })
  }

  public getFAQ() {
    return this.http.get<IFaq[]>(`${CommonUrl.MAIN_URL + CommonUrl.SUPPORT_URL}faq`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!),
      })
    })
  }
}
