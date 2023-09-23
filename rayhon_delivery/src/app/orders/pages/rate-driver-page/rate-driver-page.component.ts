import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CustomStarRatingService } from '../../services/custom-star-rating.service';

@Component({
  selector: 'app-rate-driver-page',
  templateUrl: './rate-driver-page.component.html',
  styleUrls: ['./rate-driver-page.component.scss']
})
export class RateDriverPageComponent {


  constructor(public location: Location) {}
}
