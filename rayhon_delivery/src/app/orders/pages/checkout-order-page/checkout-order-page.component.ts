import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { HomeService } from 'src/app/home/services/home/home.service';
import { fetchCart, fetchPaymentMethods, updateCart } from 'src/app/redux/actions/orders.actions';
import { selectCart } from 'src/app/redux/selectors/app.selectors';
import { ICart } from 'src/app/shared/models/ICart.model';
import { EditFoodModalComponent } from '../../components/edit-food-modal/edit-food-modal.component';
import { OrdersService } from '../../services/orders/orders.service';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-order-page',
  templateUrl: './checkout-order-page.component.html',
  styleUrls: ['./checkout-order-page.component.scss']
})
export class CheckoutOrderPageComponent implements OnInit {

  @ViewChild('editFoodModal') public editFoodModal!: ElementRef;

  public selectCart$ = this.store.select(selectCart);

  public editFoodData!: ICart['items'][0];

  public showEditFoodModal = false;
  
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  public orderLoaded = true;

  public isOrderButtonDisabled = false;

  public orderId!: string;

  constructor(
              public location: Location,
              private store: Store,
              public homeService: HomeService,
              public dialog: MatDialog,
              private orderService: OrdersService,
              public modalService: ModalService,
              public router: Router) {}

  ngOnInit(): void {
      window.scrollTo(0,0)
      this.store.dispatch(fetchCart());
      this.store.dispatch(fetchPaymentMethods());
      this.modalService.showErrorModal = false;
      this.modalService.showSuccessModal = false;
  }

  public openEditOrderModal(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(EditFoodModalComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { order: this.editFoodData}
    });
  }

  public createOrder(cart: ICart) {
    const orderData = {
      payment_id: 'cash',
      delivery_method_id: 'delivery'
    }
    this.isOrderButtonDisabled = true;
    this.orderService.createOrder(orderData).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (data) => {
        console.log(data)
        this.isOrderButtonDisabled = false;
        this.modalService.showSuccessModal = true;
        this.orderId = data.id;
      },
      error: (data) => {
        console.log(data)
        this.isOrderButtonDisabled = false;
        this.modalService.showErrorModal = true;
      }
    })
  }
}
