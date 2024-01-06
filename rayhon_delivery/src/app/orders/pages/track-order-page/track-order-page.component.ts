import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectChosenOrder } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-track-order-page',
  templateUrl: './track-order-page.component.html',
  styleUrls: ['./track-order-page.component.scss']
})
export class TrackOrderPageComponent implements OnInit {

  public map: any;
  @ViewChild('yamaps') mapElement!: ElementRef;

  public chosenOrder$ = this.store.select(selectChosenOrder);

  constructor(
              public location: Location,
              private ordersService: OrdersService,
              private store: Store
              ) {}

  ngOnInit(): void {
    ymaps.ready().then(() => this.ordersService.createMap(this.map, 41.330201, 69.232324));
  }

}
