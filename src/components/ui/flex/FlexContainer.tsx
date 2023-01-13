import React from 'react'
import { View, StyleSheet, ViewProps } from 'react-native'

type Props = ViewProps & {
  children: React.ReactNode
}
const FlexContainer = ({ children, style, ...props }: Props) => {
  return (
    <View style={[styles.flexContainer, style]} {...props}>
      {children}
    </View>
  )
}
export default FlexContainer

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
})
