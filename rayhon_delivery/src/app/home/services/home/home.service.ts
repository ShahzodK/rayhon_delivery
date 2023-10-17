import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/auth/models/user.model';
import { CommonKey } from 'src/app/shared/consts/commonKey';
import { CommonUrl } from 'src/app/shared/consts/commonUrl';
import { IUIElements } from '../../models/uiElements.model';
import { IMenu } from '../../models/menu.model';
import { IError } from 'src/app/shared/models/IError.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public chosenAddressId!: string;
  public chosenLanguage!: string;

  public searchQuery!: string

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
    return this.http.get<{data: IMenu['category_items'][0]['items'], error: IError }>(CommonUrl.MAIN_URL + CommonUrl.ITEMS_URL + `/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }
}
