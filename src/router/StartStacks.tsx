import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native'
import ChatScreen from '../screens/ChatScreen/ChatScreen'
import StartScreen from '../screens/StartScreen'
import CustomStackHeader from '../components/headers/CustomStackHeader'
import useChatStore from '../store/useChatStore'
import { getRandomImagePlaceholder, getRandomAvatarLetters } from '../util/defaultValues'

const Stack = createNativeStackNavigator()

const StartStacks = () => {

  const { currentChannel } = useChatStore()

  const stackHeaderTitle = currentChannel?.name ? currentChannel?.name : "Unknown"
  const stackHeaderImage = currentChannel?.name ? getRandomImagePlaceholder(currentChannel.name) : getRandomAvatarLetters('Unknown')

  return (
    <Stack.Navigator
      initialRouteName="Start"
    >
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: (props: NativeStackHeaderProps) => (<CustomStackHeader {...props} image={stackHeaderImage} title={stackHeaderTitle} />),
        }}
      />
    </Stack.Navigator>
  )
}

export default StartStacks

const style = StyleSheet.create({
  headerStyle: {
    height: 50
  }
})