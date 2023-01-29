import * as Notifications from 'expo-notifications'
import { Message } from '../models/Message.model'

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

  const showNewMessageNotification = async (message: Message) => {
    console.log('triggering notification...')
    const res = await Notifications.scheduleNotificationAsync({
      content: {
        title: `${message.channel?.name}`,
        subtitle: `${message.channel?.name}`,
        body: `${message.user?.name}: ${message.text}`,
        sound: 'default'
      },
      trigger: { seconds: 2 }
    })
    console.log(`notificationId: ${res}`)
  }

  return {
    triggerNotification,
    showNewMessageNotification
  }
}
export default useLocalNotification
