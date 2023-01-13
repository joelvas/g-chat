import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import Constants from 'expo-constants'

const EmptyAppBar = () => {
  const theme = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
    </View>
  )
}
export default EmptyAppBar

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 5,
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
})
