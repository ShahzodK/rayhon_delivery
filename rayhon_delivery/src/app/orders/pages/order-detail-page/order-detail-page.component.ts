import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { IChosenOrder } from '../../models/chosenOrder.model';

@Component({
  selector: 'app-order-detail-page',
  templateUrl: './order-detail-page.component.html',
  styleUrls: ['./order-detail-page.component.scss']
})
export class OrderDetailPageComponent implements OnInit {

  public unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public id!: string;
  public order!: IChosenOrder;

  constructor(
              public location: Location,
              private ordersService: OrdersService,
              private route: ActivatedRoute
              ) {}

  ngOnInit(): void {
      this.route.paramMap.pipe(
        takeUntil(this.unsubscribe$),
        switchMap((params) => {
          this.id = params.get('id')!;
          return this.ordersService.getChosenOrder(this.id)
        })
        ).subscribe(data => {
          this.order = data;
          console.log(this.order)
        });
  }
}
