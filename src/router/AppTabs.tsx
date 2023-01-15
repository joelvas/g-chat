import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import StartStacks from './StartStacks'
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import useChatStore from '../store/useChatStore'

const Tab = createBottomTabNavigator()
const AppTabs = () => {

  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  }

  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Chats"
        component={StartStacks}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-text-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        })}
      />

    </Tab.Navigator>
  )
}

export default AppTabs
