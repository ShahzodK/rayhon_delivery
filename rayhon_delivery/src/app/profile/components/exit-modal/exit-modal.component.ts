import { Component } from '@angular/core';
import { CommonKey } from 'src/app/shared/consts/commonKey';

@Component({
  selector: 'app-exit-modal',
  templateUrl: './exit-modal.component.html',
  styleUrls: ['./exit-modal.component.scss']
})
export class ExitModalComponent {

  constructor() {}

  public exit() {
    localStorage.removeItem(CommonKey.TOKEN);
    localStorage.removeItem(CommonKey.TOKEN_EXPIRE_DATE);
    localStorage.setItem(CommonKey.IS_LOGINED, 'false');
    location.reload()
  }
  
}
