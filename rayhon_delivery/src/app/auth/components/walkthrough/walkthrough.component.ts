import { Component } from '@angular/core';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.component.html',
  styleUrls: ['./walkthrough.component.scss']
})
export class WalkthroughComponent {

  constructor(public authService: AuthService) {}
  
  public isLastSlide = false;

  public customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
  }

  public getSlideId(event: SlidesOutputData) {
    if(event.startPosition == 1) {
      this.isLastSlide = true;
    }
  }
}
