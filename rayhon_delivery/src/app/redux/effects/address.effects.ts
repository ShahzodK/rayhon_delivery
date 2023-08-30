import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from "rxjs";
import * as ProfileActions from '../actions/address.actions';
import { ProfileService } from "src/app/profile/services/profile.service";
import { IAddresses } from "src/app/profile/models/addresses.model";
import { IAddress } from "src/app/profile/models/address.model";
import { HomeService } from "src/app/home/services/home.service";


@Injectable()

export class AddressEffects {

    constructor(
        private actions$: Actions,
        private profileService: ProfileService,
        private homeService: HomeService
        ) {}

    public fetchAddresses$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(ProfileActions.fetchAddresses),
            switchMap(() => this.profileService.getAddresses()),
            map((addresses: IAddresses) => {
                this.profileService.addressesCount = addresses.count;
                addresses.data.forEach(address => {
                    if(address.is_default == true)  this.homeService.chosenAddressId = address.id
                });
                return ProfileActions.fetchAddressesSuccess(addresses)
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
                return ProfileActions.chooseAddressSuccess(address)
            }),
            catchError(() => of(ProfileActions.chooseAddressFailed))
        )
    })
}