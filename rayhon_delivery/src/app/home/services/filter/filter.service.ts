import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  public sortType!: string;
  public maxPrice: number = 0;
}
