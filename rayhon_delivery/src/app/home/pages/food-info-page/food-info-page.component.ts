import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { fetchUIElements } from 'src/app/redux/actions/home.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { selectMenu } from 'src/app/redux/selectors/app.selectors';
import { HomeService } from '../../services/home/home.service';
import { IMenu } from '../../models/menu.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/orders/services/orders/orders.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { SaveCartSuccess } from 'src/app/redux/actions/orders.actions';

@Component({
  selector: 'app-food-info-page',
  templateUrl: './food-info-page.component.html',
  styleUrls: ['./food-info-page.component.scss']
})
export class FoodInfoPageComponent implements OnInit, AfterViewChecked, OnDestroy {

  public id!: string;
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public selectMenu$ = this.store.select(selectMenu);
  public currentFood!: any;
  public selectedOption: any;
  public isAddToBasketButtonLoading = false; 
  public foodInfoPageLoaded = false;

  constructor(
              private store: Store,
              public location: Location,
              private route: ActivatedRoute,
              public router: Router,
              private homeService: HomeService,
              private ordersService: OrdersService,
              public modalService: ModalService
              ) {}
  
  public foodInfoForm = new FormGroup({
    selectedOption: new FormControl<any>('', {
      nonNullable: true,
      validators: Validators.required
    }),
    selectedAmount: new FormControl<string>('1', {
      nonNullable: true,
      validators: Validators.required
    }),
    notesForRestaurant: new FormControl<string>('', {nonNullable: true})
  });

  ngOnInit() {
    window.scrollTo(0, 0)
    console.log(this.foodInfoForm.get('selectedOption')!.value)
    this.store.dispatch(fetchUIElements());
    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.id = params.get('id')!;
    });
    this.homeService.getItem(this.id).subscribe((data) => {
      this.foodInfoPageLoaded = true;
      this.currentFood = data.data;
      this.foodInfoForm.get('selectedOption')!.setValue(this.currentFood?.variants[0]);
      console.log(data)
    })
  }
  ngAfterViewChecked(): void {

  }

  changeAmount(isIncrease: boolean) {
    const currentAmount = this.foodInfoForm.get('selectedAmount')!.value;
    if(isIncrease) {
      this.foodInfoForm.get('selectedAmount')?.setValue((+currentAmount! + 1).toString())
    }
    else if(!isIncrease && +currentAmount! > 1) {
      this.foodInfoForm.get('selectedAmount')?.setValue((+currentAmount! - 1).toString())
    }
  }

  onOptionSelected(option: string) {
    this.foodInfoForm.get('selectedOption')!.setValue(option);
  }

  addToBasket() {
    if(this.foodInfoForm.valid) {
      let dataForCart = {
        variant_id: this.foodInfoForm.get('selectedOption')!.value.id,
        quantity: +this.foodInfoForm.get('selectedAmount')!.value,
        note: this.foodInfoForm.get('notesForRestaurant')!.value
      }
      this.isAddToBasketButtonLoading = true;
      console.log(dataForCart);
      this.ordersService.addToCart(dataForCart).pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: (data) => {
        this.isAddToBasketButtonLoading = false;
        if(data.data) {
          this.modalService.showSuccessModal = true;
          this.store.dispatch(SaveCartSuccess(data.data))
          console.log(data)
        }
        if(data.error) {
          this.modalService.showErrorModal = true;
        }
        console.log(data)
      },
      error: () => {
        this.modalService.showErrorModal = true;
        this.isAddToBasketButtonLoading = false;
      }
    })
    }
  }

  public goToMenu() {
    
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
    this.modalService.showErrorModal = false;
    this.modalService.showSuccessModal = true;  
  }

  
}
