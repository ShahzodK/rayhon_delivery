import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserData } from 'src/app/redux/selectors/app.selectors';
import { ModeToggleService } from 'src/app/shared/services/mode-toggle.service';

@Component({
  selector: 'app-profile-settings-page',
  templateUrl: './profile-settings-page.component.html',
  styleUrls: ['./profile-settings-page.component.scss']
})
export class ProfileSettingsPageComponent implements OnInit {

  public selectUserData$ = this.store.select(selectUserData);

  constructor(  
              private store: Store,
              public modeToggleService: ModeToggleService) {}

  ngOnInit() {
  }
}
