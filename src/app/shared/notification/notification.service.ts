import { Injectable } from '@angular/core';
import { Notification } from './models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications: Notification[] = [];

  show(notification: Notification): void {
    this.notifications.push(notification);
  }

  remove(notification: Notification) {
    this.notifications = this.notifications.filter(n => n !== notification);
  }
}
