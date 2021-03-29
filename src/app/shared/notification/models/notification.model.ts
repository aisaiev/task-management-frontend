export interface Notification {
  header: string;
  body: string;
  severity: NotificationSeverity;
  delay?: number;
}

export const enum NotificationSeverity {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  DANGER = 'DANGER'
}
