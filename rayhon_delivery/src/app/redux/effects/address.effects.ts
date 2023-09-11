import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from "rxjs";
import * as ProfileActions from '../actions/address.actions';
import { ProfileService } from "src/app/profile/services/profile.service";
import { IAddresses } from "src/app/profile/models/addresses.model";
import { IAddress } from "src/app/profile/models/address.model";
import { HomeService } from "src/app/home/services/home.service";
import { Store } from "@ngrx/store";


@Injectable()

export class AddressEffects {

    constructor(
        private actions$: Actions,
        private profileService: ProfileService,
        private homeService: HomeService,
        private store: Store
        ) {}

    public fetchAddresses$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(ProfileActions.fetchAddresses),
            switchMap(() => this.profileService.getAddresses()),
            map((addresses: IAddresses) => {
                console.log(addresses)
                if(addresses.data) {
                    this.profileService.addressesCount = addresses.count;
                    let hasDefaultAddress = false;
                    addresses.data.forEach(address => {
                        if(address.is_default == true){
                            this.homeService.chosenAddressId = address.id
                            this.store.dispatch(ProfileActions.fetchChosenAddress(address))
                            hasDefaultAddress = true;
                        }
                    });
                    if (!hasDefaultAddress && addresses.data.length > 0) {
                        const firstAddress = addresses.data[0];
                        firstAddress.is_default = true;
                        this.homeService.chosenAddressId = firstAddress.id;
                        this.store.dispatch(ProfileActions.fetchChosenAddress(firstAddress));
                    }
                    return ProfileActions.fetchAddressesSuccess(addresses)
                }
                else return ProfileActions.fetchAddressesFailed
            }),
            catchError(() => of(ProfileActions.fetchAddressesFailed))
        )
    })

    public chooseAddress$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(ProfileActions.chooseAddress),
            switchMap((payload) => this.profileService.updateAddress(payload)),
            map((address: IAddress) => {
                console.log(address)
                if(address.data) {
                    return ProfileActions.chooseAddressSuccess(address)
                }
                else return ProfileActions.chooseAddressFailed
            }),
            catchError(() => of(ProfileActions.chooseAddressFailed))
        )
    })
}