import React from 'react'
import { View, StyleSheet, ViewProps } from 'react-native'

type Props = ViewProps & {
  children: React.ReactNode
}
const FlexItem = ({ children, style, ...props }: Props) => {
  return (
    <View style={[styles.flexItem, style]} {...props}>
      {children}
    </View>
  )
}
export default FlexItem

const styles = StyleSheet.create({
  flexItem: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 4
  }
})
