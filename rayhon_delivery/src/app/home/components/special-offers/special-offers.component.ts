import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { selectOffers } from 'src/app/redux/selectors/app.selectors';
import { Store } from '@ngrx/store';
import { fetchUIElements } from 'src/app/redux/actions/home.actions';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss']
})
export class SpecialOffersComponent implements OnInit {

  public selectOffers$ = this.store.select(selectOffers)

  constructor(
              public location: Location,
              public store: Store) {
    
  }

  ngOnInit() {
    this.store.dispatch(fetchUIElements())
  }

}
