import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonUrl } from 'src/app/shared/consts/commonUrl';

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

  public login(data: {phone: string, language: string}) {
    return this.http.post<{data: {phone: string, otp_job_id: string}}>(CommonUrl.MAIN_URL + CommonUrl.LOGIN_URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public verifyPhoneNum(data: {}) {
    console.log(data)
    return this.http.post(CommonUrl.MAIN_URL + CommonUrl.VERIFY_OTP_URL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
