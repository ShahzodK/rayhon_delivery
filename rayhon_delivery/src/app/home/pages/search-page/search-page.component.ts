import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { SearchService } from 'src/app/shared/services/search/search.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { IMenu } from '../../models/menu.model';
import { IError } from 'src/app/shared/models/IError.model';
import { Store } from '@ngrx/store';
import { HomeService } from '../../services/home/home.service';
import { toggleFavorite, fetchUIElements } from 'src/app/redux/actions/home.actions';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FilterService } from '../../services/filter/filter.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('searchInput') public searchInput!: ElementRef;

  public searchResults: IMenu['category_items'][0]['items'] | [] = [];
  public recentlySearchedWords: string[] = [];
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  public likedFoods: any = []

  constructor(
              public location: Location,
              public searchService: SearchService,
              private homeService: HomeService,
              private store: Store,
              public filterService: FilterService) {}

  ngOnInit(): void {
    this.searchService.searchWord$.pipe(
      debounceTime(200),
      switchMap((word: string) => {
        console.log(word)
        return this.searchService.searchByWord(word)
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((data: IMenu['category_items'][0]['items']) => {
      this.searchService.isSearching = false;
      this.searchResults = data;
    })

    this.searchService.getRecentSearchWords().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((data) => {
      console.log(data)
      if(data.length > 0) {
        this.recentlySearchedWords = data.filter(item => item.length > 3).slice(0,6);
      }
    })
  }

  ngAfterViewInit(): void {
    this.searchInput.nativeElement.focus();
  }

  public updateSearchWord(event: Event, isFromChip = false, wordFromChip = '') {
    if(isFromChip == true) {
      this.searchService.searchWord = wordFromChip;
      this.searchService.isSearching = true;
      this.searchService.searchWord$.next(wordFromChip);
      this.searchInput.nativeElement.value = wordFromChip;
    }
    else {
      const value = (event.target as HTMLInputElement).value;
      this.searchService.searchWord = value;
      this.searchService.isSearching = true;
      if(value != '') {
        this.searchService.searchWord$.next(value);
      }
    }
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
      console.log(this.likedFoods);
      console.log(this.likedFoods.includes(id));
    }
    else if(state == false) {
      this.store.dispatch(toggleFavorite({ itemId: id, isFavorite: state }));
      this.homeService.removeFromFavorites(id).pipe(
      ).subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error)
      })
    }
  }

  public resultsOptions: OwlOptions = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    center: false,
    margin: 20,
    stagePadding: 20,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3,
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

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
    this.searchResults = [];
    this.searchService.searchWord = '';
    this.searchService.searchWord$.next('');
  }
}
