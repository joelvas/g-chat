import { Notification } from './../models/Notification.model'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { NotificationStatus } from './../models/Notification.model'
import create from 'zustand'

interface NotificacionStoreProps {
  notificacions: Notification[]
  setNotification: (notification: Partial<Notification>) => void
  dimissNotification: (notificationId: string) => void
  removeNotification: (notificationId: string) => void
  notifyError: (notification: Partial<Notification>) => void
  notifySuccess: (notification: Partial<Notification>) => void
}
const useNotificacionStore = create<NotificacionStoreProps>((set, get) => ({
  notificacions: [],
  setNotification: (notification: Partial<Notification>) => {
    set((state) => {
      const newNotification = {
        ...notification,
        id: uuidv4(),
        visible: true
      } as Notification
      return {
        ...state,
        notificacions: [...state.notificacions, newNotification]
      }
    })
  },
  dimissNotification: (notificationId: string) => {
    set((state) => {
      const newNotifications = state.notificacions.map((item) => {
        if (item.id === notificationId) {
          item.visible = false
        }
        return item
      })
      return { ...state, notifications: newNotifications }
    })
  },
  removeNotification: (notificationId: string) => {
    set((state) => {
      const filteredNotifications = state.notificacions.filter((item) => {
        item.id !== notificationId
      })
      return { ...state, notifications: filteredNotifications }
    })
  },
  notifyError: (notification: Partial<Notification>) => {
    const newNotification = {
      title: 'Error',
      message: notification.message,
      status: NotificationStatus.ERROR
    } as Notification
    return get().setNotification(newNotification)
  },
  notifySuccess: (notification: Partial<Notification>) => {
    const newNotification = {
      title: 'Success',
      message: notification.message,
      status: NotificationStatus.SUCCESS
    } as Notification
    return get().setNotification(newNotification)
  }
}))

export default useNotificacionStore
