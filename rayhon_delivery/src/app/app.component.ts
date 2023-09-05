import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { ModeToggleService } from './shared/services/mode-toggle.service';
import { Mode } from './shared/services/mode-toggle.model';
import { CommonKey } from './shared/consts/commonKey';
import * as AuthActions from 'src/app/redux/actions/auth.actions'
import { fetchAddresses } from './redux/actions/address.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Rayhon';

  public currentMode: Mode = Mode.LIGHT;


  constructor(
              private translateService: TranslateService,
              private modeToggleService: ModeToggleService,
              private store: Store,
              private router: Router
              ) {
              };

    ngOnInit(): void {
      this.translateService.setDefaultLang(environment.defaultLocale);
      this.translateService.use(environment.defaultLocale);
      if(localStorage.getItem(CommonKey.TOKEN) && localStorage.getItem(CommonKey.TOKEN_EXPIRE_DATE)) {
        let tokenExpireDate = new Date(localStorage.getItem(CommonKey.TOKEN_EXPIRE_DATE)!).getTime();
        let currentDate = new Date().getTime();
        if(currentDate < tokenExpireDate) {
          this.store.dispatch(AuthActions.fetchUser())
        }
        else {
          localStorage.removeItem(CommonKey.TOKEN)
          localStorage.removeItem(CommonKey.TOKEN_EXPIRE_DATE);
          localStorage.setItem(CommonKey.IS_LOGINED, 'false');
          this.router.navigate(['/'])
        }
      }
      else {
        this.router.navigate(['/'])
      }
    }
              
}
