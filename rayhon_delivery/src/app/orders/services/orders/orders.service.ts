import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonKey } from 'src/app/shared/consts/commonKey';
import { CommonUrl } from 'src/app/shared/consts/commonUrl';
import { ICart } from 'src/app/shared/models/ICart.model';
import { IError } from 'src/app/shared/models/IError.model';
import { ITimeSlots } from '../../models/timeSlots.model';
import { IOrder } from '../../models/order.model';
import { IChosenOrder } from '../../models/chosenOrder.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http : HttpClient) { }

  public createMap(map: any, latitude: number, longitude: number): void {
    let tashkentCityCoords = [
                              [41.536747, 68.757843, 41.563500, 69.530394],
                              [40.970277, 69.730380, 40.970277, 69.730380],
                             ] 
    map = new ymaps.Map('map', {
      center: [latitude, longitude],
      zoom: 14,
      controls: ['zoomControl',  'fullscreenControl'],
    }, {
      suppressMapOpenBlock: true,
      restrictMapArea: tashkentCityCoords,
    });

    let myGeoObject = new ymaps.GeoObject({
      geometry: {
          type: "Point",
          coordinates: [latitude, longitude]
      },
    });
    map.geoObjects.add(myGeoObject)
  }

  public addToCart(data: {variant_id:string, quantity: number, note: string}) {
    const noteUrl = `&note=${data.note}`;
    return this.http.put<ICart>(`${CommonUrl.MAIN_URL + CommonUrl.CART_URL}?variant_id=${data.variant_id}&quantity=${data.quantity}${data.note == '' ? '' : noteUrl}`, data,  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    });
  }

  public getCart() {
    return this.http.get<ICart>(CommonUrl.MAIN_URL + CommonUrl.CART_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public deleteItemFromCart(id: string, quantity: number) {
    return this.http.delete<ICart>(`${CommonUrl.MAIN_URL + CommonUrl.CART_URL}?item_id=${id}&quantity=${quantity}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public setCartAddress(id: string) {
    return this.http.post<ICart>(`${CommonUrl.MAIN_URL + CommonUrl.CART_URL}/action/set-address?address_id=${id}`, {},  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    });
  }

  public getPreOrderedSlots() {
    return this.http.get<ITimeSlots>(`${CommonUrl.MAIN_URL}${CommonUrl.ORDER_URL}/${CommonUrl.PRE_ORDERED_SLOTS_URL}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public getOrders() {
    return this.http.get<IOrder[]>(`${CommonUrl.MAIN_URL}${CommonUrl.ORDER_URL}/orders?&limit=20&offset=0`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public getChosenOrder(id: string) {
    return this.http.get<IChosenOrder>(`${CommonUrl.MAIN_URL}${CommonUrl.ORDER_URL}/orders/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public editCartItem(foodData: ICart['items'][0]) {
    return this.http.put<ICart>(`${CommonUrl.MAIN_URL}${CommonUrl.CART_URL}/item/${foodData.variant_id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }

  public clearBasket() {
    return this.http.post<ICart>(`${CommonUrl.MAIN_URL}${CommonUrl.CART_URL}/clear`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer '.concat(localStorage.getItem(CommonKey!.TOKEN)!)
      })
    })
  }
}
