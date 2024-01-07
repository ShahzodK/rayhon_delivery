import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectChosenOrder } from 'src/app/redux/selectors/app.selectors';
import { fetchChosenOrder } from 'src/app/redux/actions/orders.actions';
import { Subject, takeUntil } from 'rxjs';
import { fetchCategoryItems } from 'src/app/redux/actions/home.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track-order-page',
  templateUrl: './track-order-page.component.html',
  styleUrls: ['./track-order-page.component.scss']
})
export class TrackOrderPageComponent implements OnInit {

  public map: any;
  @ViewChild('yamaps') mapElement!: ElementRef;

  public chosenOrder$ = this.store.select(selectChosenOrder);

  public id!: string;
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
              public location: Location,
              private ordersService: OrdersService,
              private store: Store,
              private route: ActivatedRoute
              ) {}

  ngOnInit(): void {
    ymaps.ready().then(() => this.ordersService.createMap(this.map, 41.330201, 69.232324));
    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.id = params.get('id')!;
      this.store.dispatch(fetchChosenOrder({id: this.id}))
    });
  }

}
