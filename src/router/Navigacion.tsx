import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import AppTabs from './AppTabs';
import AuthTabs from './AuthTabs';
import useAuthStore from '../store/useAuthStore'

const MainStack = createNativeStackNavigator()

const MainNavigation = () => {
  const { isAuthenticated } = useAuthStore()

  return (
    <MainStack.Navigator
      initialRouteName="App"
    >
      {
        !isAuthenticated ? (
          <MainStack.Screen
            name="Auth"
            component={AuthTabs}
            options={{
              headerShown: false
            }}
          />
        ) :
          (
            <MainStack.Screen
              name="App"
              component={AppTabs}
              options={{
                headerShown: false
              }}
            />
          )
      }
    </MainStack.Navigator>
  )
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  )
}

export default Navigation
