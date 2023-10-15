import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { HomeService } from 'src/app/home/services/home/home.service';
import { toggleFavorite } from 'src/app/redux/actions/home.actions';
import { fetchFavorites } from 'src/app/redux/actions/profile.actions';
import { selectFavorites } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss']
})
export class ProfileFavoritesComponent implements OnInit, OnDestroy {

  public selectFavorites$ = this.store.select(selectFavorites);
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
              public location: Location,
              private store: Store,
              private homeService: HomeService) {}
  ngOnInit() {
    this.store.dispatch(fetchFavorites())
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
    }
    else if(state == false) {
      this.store.dispatch(toggleFavorite({ itemId: id, isFavorite: state }));
      this.homeService.removeFromFavorites(id).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error)
      })
      this.store.dispatch(fetchFavorites())
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

}
