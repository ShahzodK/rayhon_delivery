import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { clearChosenOffer, fetchChosenOffer, fetchUIElements } from 'src/app/redux/actions/home.actions';
import { selectChosenOffer, selectOffers } from 'src/app/redux/selectors/app.selectors';
import { ActivatedRoute } from '@angular/router';
import { IOffer } from 'src/app/home/models/offer.model';
import { Subject, takeUntil } from 'rxjs';
import { IChosenOffer } from 'src/app/home/models/chosenOffer.model';

@Component({
  selector: 'app-special-offers-item',
  templateUrl: './special-offers-item.component.html',
  styleUrls: ['./special-offers-item.component.scss']
})
export class SpecialOffersItemComponent implements OnInit, OnDestroy {

  public id!: string;
  public selectChosenOffer$ = this.store.select(selectChosenOffer);
  public currentOffer?: IChosenOffer;
  public unsubscribe$ = new Subject();
  public offerLoaded = false;

  constructor(public location: Location,
              private store: Store,
              private route: ActivatedRoute) {};

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
        this.id = params.get('id')!;
        this.store.dispatch(fetchChosenOffer({id: this.id}))
      });
      this.selectChosenOffer$.pipe(takeUntil(this.unsubscribe$)).subscribe((data) => {
        if(data.id) {
          this.currentOffer = data;
          this.offerLoaded = true;
        }
      })
  }

  ngOnDestroy(): void {
    let clearOffer = {
      id: '',
      name: '',
      description: '',
      image: '',
      order_button_text: '',
      order_button_color_hex: '',
      order_button_action: '',
      item: '',
      category: ''
    }
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
    this.store.dispatch(clearChosenOffer({offer: clearOffer}))
  }

}
