import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { fetchCategoryItems, toggleFavorite } from 'src/app/redux/actions/home.actions';
import { selectChosenCategory } from 'src/app/redux/selectors/app.selectors';
import { HomeService } from '../../services/home/home.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public id!: string;
  public unsubscribe$ = new Subject();
  public selectCategoryItems$ = this.store.select(selectChosenCategory)

  constructor(
              public location: Location,
              private route: ActivatedRoute,
              private store: Store,
              private homeService: HomeService) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.id = params.get('id')!;
    });
    this.store.dispatch(fetchCategoryItems({id: this.id}))
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
      // this.store.dispatch(fetchUIElements())
    }
  }
}
