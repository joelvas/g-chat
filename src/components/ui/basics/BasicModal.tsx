import React from 'react'
import { StyleSheet } from 'react-native'
import { Portal, Modal, Card, Text } from 'react-native-paper'

export interface BasicModalProps {
  children: React.ReactNode
  onDismiss?: () => void
  visible: boolean
  title?: React.ReactNode
  dismissable?: boolean
}
const BasicModal = (props: BasicModalProps) => {
  const { children, onDismiss, visible, title, dismissable } = props
  return (
    <Portal>
      <Modal
        visible={visible}
        style={styles.modal}
        dismissable={dismissable}
        onDismiss={onDismiss}
      >
        <Card>
          {title && (
            <Card.Title title={<Text variant="titleLarge">{title}</Text>} />
          )}
          <Card.Content>{children}</Card.Content>
        </Card>
      </Modal>
    </Portal>
  )
}
export default BasicModal

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 7
  }
})
