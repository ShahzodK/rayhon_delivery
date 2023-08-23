import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ModeToggleService } from './shared/services/mode-toggle.service';
import { Mode } from './shared/services/mode-toggle.model';

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
              private modeToggleService: ModeToggleService
              ) {
                this.modeToggleService.modeChanged$.subscribe((mode: Mode) => {
                  this.currentMode = mode;
                });
              };

    ngOnInit(): void {
      this.translateService.setDefaultLang(environment.defaultLocale);
      this.translateService.use(environment.defaultLocale);
    }
              
}
