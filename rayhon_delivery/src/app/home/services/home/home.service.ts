import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonKey } from 'src/app/shared/consts/commonKey';
import { CommonUrl } from 'src/app/shared/consts/commonUrl';
import { IUIElements } from '../../models/uiElements.model';
import { IMenu } from '../../models/menu.model';
import { INotification } from '../../models/notification.model';
import { IChosenOffer } from '../../models/chosenOffer.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public chosenAddressId!: string;
  public chosenLanguage!: string;

  public searchQuery!: string

  public notAvailableAddress = false;

  constructor(private http: HttpClient) { }

  public getUIElements() {
    return this.http.get<IUIElements>(CommonUrl.MAIN_URL + CommonUrl.UI_ELEMENTS_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public addToFavorites(id: string) {
    return this.http.post(CommonUrl.MAIN_URL + CommonUrl.FAVORITE_URL + `?item_id=${id}`, id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public removeFromFavorites(id: string) {
    return this.http.delete(CommonUrl.MAIN_URL + CommonUrl.FAVORITE_URL + `?item_id=${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public getItem(id: string) {
    return this.http.get<IMenu['category_items'][0]['items']>(CommonUrl.MAIN_URL + CommonUrl.ITEMS_URL + `/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public getCategoryItems(id: string) {
    return this.http.get<{items: IMenu['category_items'][0]['items'], items_count: number}>(CommonUrl.MAIN_URL + CommonUrl.CATEGORIES_URL + `/${id}/` + 'items', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public getNotificationsList() {
    return this.http.get<{notifications: INotification[], count: number}>(CommonUrl.MAIN_URL + CommonUrl.NOTIFICATION_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public getChosenOffer(id: string) {
    return this.http.get<IChosenOffer>(CommonUrl.MAIN_URL + CommonUrl.OFFERS_URL + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public sendFCMToken(data: {device: string, token: string}) {
    return this.http.post(CommonUrl.MAIN_URL + CommonUrl.DEVICE_URL + `${data.device}/action/set-fcm-token?token=${data.token}`, {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }
}
