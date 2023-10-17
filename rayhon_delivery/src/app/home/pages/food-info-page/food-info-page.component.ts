import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { fetchUIElements } from 'src/app/redux/actions/home.actions';
import { ActivatedRoute } from '@angular/router';
import { selectMenu } from 'src/app/redux/selectors/app.selectors';
import { HomeService } from '../../services/home/home.service';
import { IMenu } from '../../models/menu.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/orders/services/orders/orders.service';

@Component({
  selector: 'app-food-info-page',
  templateUrl: './food-info-page.component.html',
  styleUrls: ['./food-info-page.component.scss']
})
export class FoodInfoPageComponent implements OnInit, AfterViewChecked {

  public id!: string;
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public selectMenu$ = this.store.select(selectMenu);
  public currentFood!: any;
  selectedOption: any; 

  constructor(
              private store: Store,
              public location: Location,
              private route: ActivatedRoute,
              private homeService: HomeService,
              private ordersService: OrdersService
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
        item_id: this.foodInfoForm.get('selectedOption')!.value.id,
        quantity: +this.foodInfoForm.get('selectedAmount')!.value,
        note: this.foodInfoForm.get('notesForRestaurant')!.value
      }
      console.log(dataForCart);
      this.ordersService.addToCart(dataForCart).subscribe((data) => {
        console.log(data)
      })
    }
  }
}
