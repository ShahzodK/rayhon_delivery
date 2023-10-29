import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { fetchUIElements, toggleFavorite } from 'src/app/redux/actions/home.actions';
import { selectChosenAddress, selectMenu, selectOffers, selectPopular, selectUserData } from 'src/app/redux/selectors/app.selectors';
import { HomeService } from '../../services/home/home.service';
import { Subject, takeUntil } from 'rxjs';
import { CarouselService } from 'ngx-owl-carousel-o/lib/services/carousel.service';

@Component({
  selector: 'app-home-pages',
  templateUrl: './home-pages.component.html',
  styleUrls: ['./home-pages.component.scss']
})
export class HomePagesComponent implements OnInit, AfterViewChecked, OnDestroy {

  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  public selectUserData$ = this.store.select(selectUserData);
  public selectChosenAddress$ = this.store.select(selectChosenAddress);
  public selectOffers$ = this.store.select(selectOffers);
  public selectPopular$ = this.store.select(selectPopular);
  public selectMenu$ = this.store.select(selectMenu)

  public contentLoaded = false;

  public userImageLoaded = false;

  public offersImageLoaded = false;

  public popularImageLoaded = false;

  public isSmallScreen = false;

  public smallScreenBreakpoint = 768;

  public sortedMenuIds: string[] = [];

  constructor(
              private store: Store,
              public router: Router,
              private cdRef: ChangeDetectorRef,
              private homeService: HomeService   
              ) {}

    
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

  public menuCategoriesCarouselOptions: OwlOptions = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    center: false,
    margin: 20,
    navText: ['', ''],
    responsive: {
      0: {
        items: 4,
      },
      476: {
        items: 4,
      },
      768: {
        items: 5,
      },
      992: {
        items: 7,
      }
    },
  }


  ngOnInit(): void {
        this.isSmallScreen = window.innerWidth < this.smallScreenBreakpoint;
        this.store.dispatch(fetchUIElements());
        this.selectMenu$.subscribe((data) => {
          console.log(data)
        })
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }


  public toggleFavorite(state: boolean, id: string) {
    if(state == true) {
      this.store.dispatch(toggleFavorite({ itemId: id, isFavorite: state }));
      this.homeService.addToFavorites(id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error)
      })
      // this.store.dispatch(fetchUIElements())
    }
    else if(state == false) {
      this.store.dispatch(toggleFavorite({ itemId: id, isFavorite: state }));
      this.homeService.removeFromFavorites(id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error)
      })
      // this.store.dispatch(fetchUIElements())
    }
  }

  public sortMenu(id: string) {
    if(this.sortedMenuIds.includes(id)) {
      console.log('gr')
      this.sortedMenuIds = this.sortedMenuIds.filter(item => item != id);
    }
    else {
      this.sortedMenuIds.push(id)
    }
    console.log(this.sortedMenuIds)
  }

    ngOnDestroy(): void {
      this.unsubscribe$.next(true);
      this.unsubscribe$.unsubscribe();
    }
}
