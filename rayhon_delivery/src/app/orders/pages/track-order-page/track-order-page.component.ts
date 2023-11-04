import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-track-order-page',
  templateUrl: './track-order-page.component.html',
  styleUrls: ['./track-order-page.component.scss']
})
export class TrackOrderPageComponent implements OnInit {

  public map: any;
  @ViewChild('yamaps') mapElement!: ElementRef;

  constructor(
              public location: Location,
              private ordersService: OrdersService
              ) {}

  ngOnInit(): void {
    ymaps.ready().then(() => this.ordersService.createMap(this.map, 41.330201, 69.232324));
  }

}
