import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectUserData } from 'src/app/redux/selectors/app.selectors';
import { ModeToggleService } from 'src/app/shared/services/mode-toggle.service';
import { ExitModalComponent } from '../../components/exit-modal/exit-modal.component';

@Component({
  selector: 'app-profile-settings-page',
  templateUrl: './profile-settings-page.component.html',
  styleUrls: ['./profile-settings-page.component.scss']
})
export class ProfileSettingsPageComponent implements OnInit {

  public selectUserData$ = this.store.select(selectUserData);

  constructor(  
              private store: Store,
              public modeToggleService: ModeToggleService,
              public dialog: MatDialog) {}

  ngOnInit() {
  }

  public exit(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(ExitModalComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
