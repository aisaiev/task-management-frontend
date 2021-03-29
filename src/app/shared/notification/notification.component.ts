import { Component } from '@angular/core';
import { Notification, NotificationSeverity } from './models/notification.model';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  constructor(
    public notificationService: NotificationService
  ) { }

  getClass(notification: Notification): string {
    switch (notification.severity) {
      case NotificationSeverity.SUCCESS:
        return 'bg-success text-light'
      case NotificationSeverity.WARNING:
        return 'bg-warning text-light'
      case NotificationSeverity.DANGER:
        return 'bg-danger text-light'
      default:
        return 'bg-light text-light'
    }
  }
}
