import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { chooseAddress, fetchAddresses } from 'src/app/redux/actions/address.actions';
import { selectAddresses } from 'src/app/redux/selectors/app.selectors';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-deliver-to',
  templateUrl: './deliver-to.component.html',
  styleUrls: ['./deliver-to.component.scss']
})
export class DeliverToComponent {

  public selectAddresses = this.store.select(selectAddresses);

  constructor(
              public store: Store,
              public homeService: HomeService) {}

  public setAsDefaultAddress(address: {id: string, name: string, is_default: boolean}) {
    this.store.dispatch(chooseAddress(address));
    this.homeService.chosenAddressId = address.id;
  }

}
