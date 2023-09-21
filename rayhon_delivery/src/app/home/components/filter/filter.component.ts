import { Component } from '@angular/core';
import { FilterService } from '../../services/filter/filter.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  constructor(public location: Location,
              public filterService: FilterService) {}

  public updateSorting(sortType: string) {
    this.filterService.sortType = sortType;
  }

  public updateMaxPrice(price: number) {
    this.filterService.maxPrice = price;

  }
}
