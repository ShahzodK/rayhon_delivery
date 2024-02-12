import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectPopular } from 'src/app/redux/selectors/app.selectors';
import { fetchUIElements, toggleFavorite } from 'src/app/redux/actions/home.actions';
import { Subject, takeUntil } from 'rxjs';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  constructor(
              public location: Location,
              private store: Store,
              private homeService: HomeService) {}

  public selectPopular$ = this.store.select(selectPopular)
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
      this.store.dispatch(fetchUIElements())
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
    }
  }

}
