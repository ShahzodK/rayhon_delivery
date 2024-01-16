import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProfileService } from '../../services/profile.service';
import { IFaq } from '../../models/faq.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile-support-page',
  templateUrl: './profile-support-page.component.html',
  styleUrls: ['./profile-support-page.component.scss']
})
export class ProfileSupportPageComponent implements OnInit, AfterViewChecked {

  @ViewChild('carouselHolder', { static: false }) carouselHolder!: ElementRef;
  isCarouselFor1stTabVisible = false;

  public faq!: any;

  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  public sortedFaqIds: string[] = [];

  constructor(
              public location: Location,
              private cdRef: ChangeDetectorRef,
              private profileService: ProfileService   
             ) {}

  ngOnInit(): void {
      this.profileService.getFAQ().pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe({
        next: (data) => {
          this.faq = data;
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

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

  public sortFAQ(id: string) {
    if(this.sortedFaqIds.includes(id)) {
      this.sortedFaqIds = this.sortedFaqIds.filter(item => item != id);
    }
    else {
      this.sortedFaqIds.push(id)
    }
    console.log(this.sortedFaqIds)
  }
}
