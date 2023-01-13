export interface Notification {
  id: string
  message: string
  title: string
  status: NotificationStatus
  visible: boolean
}

export enum NotificationStatus {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  INFO = 'INFO'
}

export enum NotificationStatusColor {
  SUCCESS = '#4caf50',
  WARNING = '#ffc107',
  ERROR = '#f44336',
  INFO = '#2196f3'
}
