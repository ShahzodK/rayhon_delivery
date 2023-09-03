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

  public sendAddress(data: IAddressRequest) {
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
