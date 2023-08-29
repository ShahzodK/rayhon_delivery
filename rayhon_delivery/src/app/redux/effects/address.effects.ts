import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from "rxjs";
import * as ProfileActions from '../actions/address.actions';
import { ProfileService } from "src/app/profile/services/profile.service";
import { IAddress } from "src/app/profile/models/address.model";


@Injectable()

export class AddressEffects {

    constructor(
        private actions$: Actions,
        private profileService: ProfileService
        ) {}

    public fetchAddresses$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(ProfileActions.fetchAddresses),
            switchMap(() => this.profileService.getAddresses()),
            map((address: IAddress) => {
                console.log(address)
                return ProfileActions.fetchAddressesSuccess(address)
            }),
            catchError(() => of(ProfileActions.fetchAddressesFailed))
        )
    })

}