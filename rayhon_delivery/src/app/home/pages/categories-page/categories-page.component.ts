import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchUIElements } from 'src/app/redux/actions/home.actions';
import { selectCategories } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  public selectCategories$ = this.store.select(selectCategories);
  public categories: any;

  constructor(
              public location: Location,
              private store: Store
            ) {
              this.store.dispatch(fetchUIElements())
            }

  ngOnInit(): void {
      this.store.dispatch(fetchUIElements())
      this.selectCategories$.subscribe((data) => {
        console.log(data)
      })
  }
}
