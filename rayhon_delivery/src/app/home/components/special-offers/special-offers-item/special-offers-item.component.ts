import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { fetchUIElements } from 'src/app/redux/actions/home.actions';
import { selectOffers } from 'src/app/redux/selectors/app.selectors';
import { ActivatedRoute } from '@angular/router';
import { IOffer } from 'src/app/home/models/offer.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-special-offers-item',
  templateUrl: './special-offers-item.component.html',
  styleUrls: ['./special-offers-item.component.scss']
})
export class SpecialOffersItemComponent implements OnInit, OnDestroy {

  public id!: string;
  public selectOffers$ = this.store.select(selectOffers);
  public currentOffer?: IOffer['items'][0];
  public unsubscribe$ = new Subject()

  constructor(public location: Location,
              private store: Store,
              private route: ActivatedRoute) {};

  ngOnInit(): void {
      this.store.dispatch(fetchUIElements());
      this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
        this.id = params.get('id')!;
      });
      this.selectOffers$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
        data.items.forEach((item) => {
          if(item.id == this.id) {
            this.currentOffer = item;
            console.log(item);
          }
        })
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
