import NotificationComponent from './notification'

let notificationInstance: NotificationComponent | null = null

const getNotificationInstance = (
  callback: (n: NotificationComponent) => void
) => {
  if (notificationInstance) {
    callback(notificationInstance)
    return
  }

  NotificationComponent.newInstance({}, (instance) => {
    if (notificationInstance) {
      callback(notificationInstance)
      return
    }

    notificationInstance = instance

    callback(notificationInstance)
  })
}

const message = {
  success: (message: string) =>
    getNotificationInstance((instance: NotificationComponent) => {
      instance.add({ variant: 'success', message })
    }),
  error: (message: string) =>
    getNotificationInstance((instance: NotificationComponent) => {
      instance.add({ variant: 'error', message })
    }),
}

export default message
