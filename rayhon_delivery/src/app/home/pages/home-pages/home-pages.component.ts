import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { fetchUIElements } from 'src/app/redux/actions/home.actions';
import { selectChosenAddress, selectOffers, selectPopular, selectUserData } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-home-pages',
  templateUrl: './home-pages.component.html',
  styleUrls: ['./home-pages.component.scss']
})
export class HomePagesComponent implements OnInit {

  public selectUserData$ = this.store.select(selectUserData);
  public selectChosenAddress$ = this.store.select(selectChosenAddress);
  public selectOffers$ = this.store.select(selectOffers);
  public selectPopular$ = this.store.select(selectPopular)

  public contentLoaded = false;

  constructor(
              private store: Store,
              public router: Router) {}

    
    public offersCarouselOptions: OwlOptions = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    items: 1,
    stagePadding: 35,
    margin: 12,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      476: {
        items: 2,
        margin: 12
      },
      976: {
        items: 3
      }
    },
  }
            
  public popularCarouselOptions: OwlOptions = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    center: false,
    stagePadding: 70,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
        margin: 12
      },
      476: {
        items: 2,
        margin: 12
      },
      768: {
        items: 3,
        margin: 12
      },
      992: {
        items: 4,
        margin: 16
      }
    },
  }

  ngOnInit(): void {
        this.store.dispatch(fetchUIElements());
        this.selectPopular$.subscribe((data) => {
          console.log(data);
        })
  }
  
}
