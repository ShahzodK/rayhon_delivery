import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { fetchUIElements } from 'src/app/redux/actions/home.actions';
import { selectChosenAddress, selectOffers, selectUserData } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-home-pages',
  templateUrl: './home-pages.component.html',
  styleUrls: ['./home-pages.component.scss']
})
export class HomePagesComponent implements OnInit {

  public selectUserData$ = this.store.select(selectUserData);
  public selectChosenAddress$ = this.store.select(selectChosenAddress);
  public selectOffers$ = this.store.select(selectOffers)

  constructor(
              private store: Store,
              public router: Router) {}

  public customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    items: 1,
    stagePadding: 10,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
  }

  ngOnInit(): void {
        this.store.dispatch(fetchUIElements())
  }
  
}
