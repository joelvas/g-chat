import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import Constants from 'expo-constants'

const AppBar = () => {
  const theme = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Image style={{width: 30, height: 30, marginRight: 10}} source={require('../../../assets/icon.png')} />
      <Text style={styles.text}>ChatG</Text>
    </View>
  )
}
export default AppBar

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
})
