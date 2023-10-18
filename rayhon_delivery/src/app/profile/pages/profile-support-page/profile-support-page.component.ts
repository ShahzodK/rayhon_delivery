import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-profile-support-page',
  templateUrl: './profile-support-page.component.html',
  styleUrls: ['./profile-support-page.component.scss']
})
export class ProfileSupportPageComponent implements AfterViewChecked {

  @ViewChild('carouselHolder', { static: false }) carouselHolder!: ElementRef;
  isCarouselFor1stTabVisible = false;

  constructor(
              public location: Location,
              private cdRef: ChangeDetectorRef   
             ) {}

  public chipsCarouselOptions: OwlOptions = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    stagePadding: 20,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      385: {
        items: 4
      },
      476: {
        items: 5,
      },
      976: {
        items: 8
      }
    },
  }

  ngAfterViewChecked(): void {
    this.showCarousel();
    this.cdRef.detectChanges();
  }


  showCarousel(): void {
    if (this.carouselHolder.nativeElement.clientWidth > 0 && !this.isCarouselFor1stTabVisible) {
      setTimeout(() => {
        console.log(this.carouselHolder.nativeElement);
        this.isCarouselFor1stTabVisible =  true;
      }, 0);
    }
    console.log(this.carouselHolder.nativeElement.clientWidth);

    console.log(this.isCarouselFor1stTabVisible)
  }
}
