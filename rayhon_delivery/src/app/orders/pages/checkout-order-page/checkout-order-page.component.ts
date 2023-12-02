import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { HomeService } from 'src/app/home/services/home/home.service';
import { fetchCart, updateCart } from 'src/app/redux/actions/orders.actions';
import { selectCart } from 'src/app/redux/selectors/app.selectors';
import { ICart } from 'src/app/shared/models/ICart.model';
import { EditFoodModalComponent } from '../../components/edit-food-modal/edit-food-modal.component';

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

  constructor(
              public location: Location,
              private store: Store,
              public homeService: HomeService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
      window.scrollTo(0,0)
      this.store.dispatch(fetchCart());
  }

  public openEditOrderModal(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(EditFoodModalComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { order: this.editFoodData}
    })
  }
}
