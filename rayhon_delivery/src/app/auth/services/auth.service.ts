import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonUrl } from 'src/app/shared/consts/commonUrl';
import { CommonKey } from 'src/app/shared/consts/commonKey';
import { IVerifyPhoneRequest } from '../models/verifyPhoneRequest.model';
import { ILoginResponse } from '../models/loginResponse.model';
import { IVerifyPhoneResponse } from '../models/verifyPhoneResponse.model';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isWalkthroughEnd = localStorage.getItem('isFirstVisit') == 'true' ? true : false;

  public setWalkthroughEnd(boolean: boolean) {
    this.isWalkthroughEnd = boolean;
    localStorage.setItem('isFirstVisit', `${boolean}`)
  }

  constructor(
    private http: HttpClient
  ) { }

  public getUser() {
    return this.http.get<IUser>(CommonUrl.MAIN_URL + CommonUrl.USER_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public login(data: {phone: string, language: string}) {
    return this.http.post<ILoginResponse>(CommonUrl.MAIN_URL + CommonUrl.LOGIN_URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public verifyPhoneNum(data: IVerifyPhoneRequest) {
    console.log(data)
    return this.http.post<IVerifyPhoneResponse>(CommonUrl.MAIN_URL + CommonUrl.VERIFY_OTP_URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
