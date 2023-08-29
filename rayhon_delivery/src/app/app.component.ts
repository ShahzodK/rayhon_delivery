import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { ModeToggleService } from './shared/services/mode-toggle.service';
import { Mode } from './shared/services/mode-toggle.model';
import { CommonKey } from './shared/consts/commonKey';
import * as AuthActions from 'src/app/redux/actions/auth.actions'
import { fetchAddresses } from './redux/actions/address.actions';

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
              private store: Store
              ) {
                this.modeToggleService.modeChanged$.subscribe((mode: Mode) => {
                  this.currentMode = mode;
                });
              };

    ngOnInit(): void {
      this.translateService.setDefaultLang(environment.defaultLocale);
      this.translateService.use(environment.defaultLocale);
      if(localStorage.getItem(CommonKey.TOKEN)) {
        this.store.dispatch(AuthActions.fetchUser())
      }
    }
              
}
