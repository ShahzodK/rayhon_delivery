import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FetchPreOrderedSlots, fetchCart } from 'src/app/redux/actions/orders.actions';
import { selectCart, selectPreOrderedTimeSlots } from 'src/app/redux/selectors/app.selectors';
import { ITimeSlots } from '../../models/timeSlots.model';

@Component({
  selector: 'app-pre-order-page',
  templateUrl: './pre-order-page.component.html',
  styleUrls: ['./pre-order-page.component.scss']
})
export class PreOrderPageComponent implements OnInit {
  public selectedDay: string = '';
  public selectedTime: string = '';
  public schedule: { [key: string]: string[] } = {};
  public days!: string[];

  public selectPreOrderedSlots$ = this.store.select(selectPreOrderedTimeSlots);
  public selectCart$ = this.store.select(selectCart);

  constructor(private store: Store) {}

  ngOnInit(): void {
      this.store.dispatch(FetchPreOrderedSlots());
      this.store.dispatch(fetchCart());
      this.selectPreOrderedSlots$.subscribe({
        next: (data) => {
          this.schedule = {
            ...data
          }
          delete this.schedule['type']
          this.days = Object.keys(this.schedule);
          this.selectedDay = this.days[0]; 
          this.selectedTime = this.schedule[this.selectedDay][0];
        },
        error: (error) => console.log(error)
      });
    }
}
