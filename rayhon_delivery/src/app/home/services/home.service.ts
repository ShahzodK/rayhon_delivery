import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public chosenAddressId!: string;

  constructor() { }
}
