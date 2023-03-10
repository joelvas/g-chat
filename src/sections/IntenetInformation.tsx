import { useEffect } from 'react';
import useNotificacionStore from '../store/useNotificationStore';
import NetInfo from '@react-native-community/netinfo';
import Constants from 'expo-constants';
import useAuthStore from '../store/useAuthStore';

const IntenetInformation = () => {
  const { notifyError, notifySuccess } = useNotificacionStore()
  const { API_URL } = useAuthStore()

  useEffect(() => {
    NetInfo.fetch().then(state => {
      console.log(state.isConnected ? 'Connected to ' + state.type : 'Error connecting to internet');
      // if (!state.isConnected) {
      //   notifyError({ message: 'Error connecting to internet' })
      // } else {
      //   notifySuccess({ message: 'Connected to ' + state.type })
      // }
    });

  }, [])
  return null
}
export default IntenetInformation