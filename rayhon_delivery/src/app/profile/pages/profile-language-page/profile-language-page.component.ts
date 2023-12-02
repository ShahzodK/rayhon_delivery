import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectUserData } from 'src/app/redux/selectors/app.selectors';
import { ProfileService } from '../../services/profile.service';
import { fetchUser } from 'src/app/redux/actions/auth.actions';
import { HomeService } from 'src/app/home/services/home/home.service';
import { environment } from 'src/environments/environment';
import { ELocales } from 'src/app/shared/enums/ELocales';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-language-page',
  templateUrl: './profile-language-page.component.html',
  styleUrls: ['./profile-language-page.component.scss']
})
export class ProfileLanguagePageComponent implements OnDestroy {

  public selectUserData$ = this.store.select(selectUserData)

  public unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public locales = ELocales;

  constructor(
              private store: Store,
              private profileService: ProfileService,
              public location: Location,
              public homeService: HomeService,
              public translate: TranslateService) {}

  public updateLanguage(firstName: string, lastName: string, language: ELocales) {
    const profileValues = {
      first_name: firstName,
      last_name: lastName,
      language: language
    }
    this.homeService.chosenLanguage = language;
    environment.defaultLocale = language;
    this.translate.use(language);
    this.profileService.updateUser(profileValues).pipe(
      takeUntil(this.unsubscribe$)).subscribe((data) => {
        this.store.dispatch(fetchUser());
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
