import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonKey } from 'src/app/shared/consts/commonKey';
import { CommonUrl } from 'src/app/shared/consts/commonUrl';
import { ICart } from 'src/app/shared/models/ICart.model';
import { IError } from 'src/app/shared/models/IError.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http : HttpClient) { }

  public addToCart(data: {variant_id:string, quantity: number, note: string}) {
    const noteUrl = `&note=${data.note}`;
    return this.http.put<{data: ICart, error: IError}>(`${CommonUrl.MAIN_URL + CommonUrl.CART_URL}?variant_id=${data.variant_id}&quantity=${data.quantity}${data.note == '' ? '' : noteUrl}`, data,  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    });
  }

  public getCart() {
    return this.http.get<{data: ICart, error: IError}>(CommonUrl.MAIN_URL + CommonUrl.CART_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public deleteItemFromCart(id: string, quantity: number) {
    return this.http.delete<{data: ICart, error: IError}>(`${CommonUrl.MAIN_URL + CommonUrl.CART_URL}?item_id=${id}&quantity=${quantity}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }
}
