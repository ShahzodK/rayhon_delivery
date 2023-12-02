import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCart } from 'src/app/redux/selectors/app.selectors';
import { OrdersService } from '../../services/orders/orders.service';
import { Subject, takeUntil } from 'rxjs';
import { SaveCartSuccess, fetchCart } from 'src/app/redux/actions/orders.actions';
import { ICart } from 'src/app/shared/models/ICart.model';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss']
})
export class BasketPageComponent implements OnDestroy {

  public selectCart$ = this.store.select(selectCart);
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public showDeleteItemModal = false;
  public itemToBeRemoved!: ICart['items'][0];
  public isQuantityLoading = false;

  constructor(
              public location: Location,
              private store: Store,
              private ordersService: OrdersService,
             ) {}

  public chooseItemTodelete(item: ICart['items'][0]) {
    this.itemToBeRemoved = item;
    this.showDeleteItemModal = true;
  }

  public deleteItem() {
    this.ordersService.deleteItemFromCart(this.itemToBeRemoved.variant_id, this.itemToBeRemoved.quantity).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (data) => {
        this.store.dispatch(fetchCart());
        this.showDeleteItemModal = false
        this.itemToBeRemoved = {
          variant_id: '',
          price: 0,
          item_id: '',
          name: '',
          active: false,
          image: '',
          quantity: 0,
          note: ''
        }
      },
      error: (error) => {
        console.error(error);
        this.showDeleteItemModal = false
        this.itemToBeRemoved = {
          variant_id: '',
          price: 0,
          item_id: '',
          name: '',
          active: false,
          image: '',
          quantity: 0,
          note: ''
        }
      }
    })
  }

  public cancelDeleteItem() {
    this.showDeleteItemModal = false;
    this.itemToBeRemoved = {
      variant_id: '',
      price: 0,
      item_id: '',
      name: '',
      active: false,
      image: '',
      quantity: 0,
      note: ''
    }
  }

  public changeQuantity(item: ICart['items'][0], isIncrease: boolean) {
    this.isQuantityLoading = true;
    let data: {variant_id: string, quantity: number, note: string} = {
      variant_id: item.variant_id,
      quantity: 1,
      note: item.note
    };
    if(isIncrease) {
      this.ordersService.addToCart(data).pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: (data) => {
          this.isQuantityLoading = false;
          if(data) {
            this.store.dispatch(SaveCartSuccess(data))
          }
        },
        error: (error) => {
            this.isQuantityLoading = false;
            console.error(error);
        }
      })
    }
    else {
      this.ordersService.deleteItemFromCart(data.variant_id, 1).pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: (data) => {
          this.isQuantityLoading = false;
          if(data) {
            this.store.dispatch(SaveCartSuccess(data))
          }
        },
        error: (error) => {
          this.isQuantityLoading = false;
          console.error(error);
        }
      })
    }
  }

  public clearBasket() {
    this.ordersService.clearBasket()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
