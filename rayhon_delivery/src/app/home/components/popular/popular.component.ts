import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectPopular } from 'src/app/redux/selectors/app.selectors';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent {

  constructor(
              public location: Location,
              private store: Store) {}

  public selectPopular$ = this.store.select(selectPopular)

}
