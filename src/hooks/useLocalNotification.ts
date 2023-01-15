import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

const useLocalNotification = () => {
  const triggerNotification = async ({
    content,
    trigger
  }: Notifications.NotificationRequestInput) => {
    await Notifications.scheduleNotificationAsync({
      content,
      trigger
    })
  }
  
  const triggerNewMessageNotification = async ({
    title,
    subtitle,
    message
  }) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${title}`,
        subtitle: `${subtitle}`,
        body: `${message}`,
        sound: 'default'
      },
      trigger: { seconds: 2 }
    })
  }

  return {
    triggerNotification,
    triggerNewMessageNotification
  }
}
export default useLocalNotification
