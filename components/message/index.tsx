import NotificationComponent from './notification'

class Message {
  private notificationInstance: NotificationComponent | null = null

  private getNotificationInstance = (
    callback: (n: NotificationComponent) => void
  ) => {
    if (this.notificationInstance) {
      callback(this.notificationInstance)
      return
    }

    NotificationComponent.newInstance({}, (instance) => {
      if (this.notificationInstance) {
        callback(this.notificationInstance)
        return
      }

      this.notificationInstance = instance

      callback(this.notificationInstance)
    })
  }

  public success = (message: string) =>
    this.getNotificationInstance((instance: NotificationComponent) => {
      instance.add({ variant: 'success', message })
    })

  public error = (message: string) =>
    this.getNotificationInstance((instance: NotificationComponent) => {
      instance.add({ variant: 'error', message })
    })
}

const message = new Message()

export default message
