import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss']
})
export class BottomNavigationComponent implements AfterViewInit, OnDestroy {

  @ViewChild('homeBtn', { static: false }) homeBtn!: ElementRef;
  @ViewChild('ordersBtn', { static: false }) ordersBtn!: ElementRef;
  @ViewChild('basketBtn', { static: false }) basketBtn!: ElementRef;
  @ViewChild('profileBtn', { static: false }) profileBtn!: ElementRef;

  public activePage!: string;

  public unsubscribe$ = new Subject()

  constructor(
              private router: Router,
              private cdRef: ChangeDetectorRef   
              ) {}

  ngAfterViewInit() {
    const currentUrl = this.router.url;
    const home = 'home';
    const profile = 'profile/settings';
    const basket = 'orders/basket';
    const orders = 'orders';
    if(currentUrl.includes(profile)) {
      this.profileBtn.nativeElement.classList.add('bottom_nav_active');
      this.activePage = 'profile'
    }
    else if(currentUrl.includes(home)) {
      this.homeBtn.nativeElement.classList.add('bottom_nav_active');
      this.activePage = 'home'
    }
    else if(currentUrl.includes(basket)) {
      this.basketBtn.nativeElement.classList.add('bottom_nav_active');
      this.activePage = 'basket'
    }
    else if(currentUrl.includes(orders)) {
      this.ordersBtn.nativeElement.classList.add('bottom_nav_active');
      this.activePage = 'orders'
    }
    this.cdRef.detectChanges()
  }

  public toPage(link: string) {
    this.router.navigate([link])
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
