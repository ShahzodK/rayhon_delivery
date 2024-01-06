import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { INotification } from '../../models/notification.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss']
})
export class NotificationsPageComponent implements OnInit {
  
  public notifications!: INotification[];
  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
              public location: Location,
              private homeService: HomeService) {}

    ngOnInit(): void {
        this.homeService.getNotificationsList().pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe((data) => {
          this.notifications = data.notifications;
        })
    }

}
