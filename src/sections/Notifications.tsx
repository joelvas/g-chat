import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Snackbar, Portal } from 'react-native-paper'
import { NotificationStatusColor } from '../models/Notification.model'
import useNotificacionStore from '../store/useNotificationStore'

const Notifications = () => {
  const { notificacions, dimissNotification, removeNotification } =
    useNotificacionStore()

  return (
    <View style={styles.container}>
      {notificacions.map((item) => {
        return (
          <Snackbar
            key={item.id}
            visible={item.visible}
            style={{ backgroundColor: NotificationStatusColor[item.status] }}
            onDismiss={() => removeNotification(item.id)}
            action={{
              label: 'Dimiss',
              textColor: 'white',
              onPress: () => {
                dimissNotification(item.id)
              }
            }}
          >
            {item.message}
          </Snackbar>
        )
      })}
    </View>
  )
}
export default Notifications

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between'
  }
})
