import { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import CustomTheme from './src/themes/CustomTheme'
import Main from './src/Main';
import axios from 'axios';
import SocketInit from './src/sections/Sockets';
import useAuthentication from './src/hooks/useAuthentication';
import useAuthStore from './src/store/useAuthStore'
import IntenetInformation from './src/sections/IntenetInformation';
import SyncData from './src/sections/SyncData';

export default function App() {

  const { readAuthentication } = useAuthentication()

  useEffect(() => {
    readAuthentication()
  }, [])

  const { token, isAuthenticated, API_URL } = useAuthStore()

  const defaultHeader = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-token': token
  }

  axios.defaults.baseURL = `${API_URL}`;
  axios.defaults.headers.post = defaultHeader
  axios.defaults.headers.get = defaultHeader

  return (
    <SafeAreaProvider>
      <PaperProvider theme={CustomTheme}>
        <StatusBar style="auto" />
        <IntenetInformation />
        {isAuthenticated && <SocketInit />}
        {isAuthenticated && <SyncData />}
        <Main />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

