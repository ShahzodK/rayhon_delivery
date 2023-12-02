import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { updateCart } from 'src/app/redux/actions/orders.actions';

@Component({
  selector: 'app-edit-food-modal',
  templateUrl: './edit-food-modal.component.html',
  styleUrls: ['./edit-food-modal.component.scss']
})
export class EditFoodModalComponent {

  constructor(    
    public dialogRef: MatDialogRef<EditFoodModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
    ) { }

    public order = {...this.data.order};

  public changeAmount(isIncrease: boolean) {
    if(isIncrease) this.order.quantity++
    else if(!isIncrease && this.order.quantity > 0) this.order.quantity--
  }
  public editOrder() {
    this.store.dispatch(updateCart(this.order))
  }

}
