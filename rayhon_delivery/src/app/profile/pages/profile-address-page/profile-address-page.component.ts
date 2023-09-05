import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAddresses } from 'src/app/redux/selectors/app.selectors';
import { HomeService } from 'src/app/home/services/home.service';

@Component({
  selector: 'app-profile-address-page',
  templateUrl: './profile-address-page.component.html',
  styleUrls: ['./profile-address-page.component.scss']
})
export class ProfileAddressPageComponent {
  public selectAddresses$ = this.store.select(selectAddresses);

  constructor(private store: Store, 
              public location: Location,
              public homeService: HomeService,
            ) {}
}
