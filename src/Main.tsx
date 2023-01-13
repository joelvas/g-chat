import { View } from 'react-native';
import { withTheme } from 'react-native-paper';
import { CustomThemeProps } from './themes/CustomTheme';
import Notifications from './sections/Notifications'
import { StatusBar } from 'expo-status-bar'
import EmptyAppBar from './components/appbars/EmptyAppBar'
import Navigation from './router/Navigacion'

interface Props {
  theme: CustomThemeProps
}

const Main = ({ theme }: Props) => {

  return (
    <View style={{ flexGrow: 1 }}>
      <StatusBar style="auto" />
      <EmptyAppBar />
      <Navigation />
      <Notifications />
    </View>
  )
}

export default withTheme(Main)
