import { Component, Inject } from '@angular/core';
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
    private store: Store) { }

  public changeAmount(isIncrease: boolean) {
    if(isIncrease) this.data.quantity++
    else if(!isIncrease && this.data.quantity > 0) this.data.quantity--
  }
  public editOrder() {
    this.store.dispatch(updateCart(this.data))
  }

}
