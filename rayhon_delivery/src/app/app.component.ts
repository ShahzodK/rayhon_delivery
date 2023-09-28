import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { ModeToggleService } from './shared/services/mode-toggle.service';
import { Mode } from './shared/services/mode-toggle.model';
import { CommonKey } from './shared/consts/commonKey';
import * as AuthActions from 'src/app/redux/actions/auth.actions'
import { Router } from '@angular/router';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Rayhon';

  public currentMode: Mode = Mode.LIGHT;
  public message:any = null;


  constructor(
              private translateService: TranslateService,
              private modeToggleService: ModeToggleService,
              private store: Store,
              private router: Router
              ) {
              };

    ngOnInit(): void {
      this.requestPermission();
      this.listen();
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

    public requestPermission() {
      const messaging = getMessaging();
      getToken(messaging, 
       { vapidKey: environment.firebase.vapidKey}).then(
         (currentToken) => {
           if (currentToken) {
             console.log("Hurraaa!!! we got the token.....");
             console.log(currentToken);
           } else {
             console.log('No registration token available. Request permission to generate one.');
           }
       }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
      });
    }

    public listen() {
      const messaging = getMessaging();
      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        this.message = payload;
      });
    }
              
}
