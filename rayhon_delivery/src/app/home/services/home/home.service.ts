import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/auth/models/user.model';
import { CommonKey } from 'src/app/shared/consts/commonKey';
import { CommonUrl } from 'src/app/shared/consts/commonUrl';
import { IUIElements } from '../../models/uiElements.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public chosenAddressId!: string;
  public chosenLanguage!: string;

  constructor(private http: HttpClient) { }

  public getUIElements() {
    return this.http.get<IUIElements>(CommonUrl.MAIN_URL + CommonUrl.UI_ELEMENTS_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }
}
