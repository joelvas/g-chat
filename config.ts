import Constants from 'expo-constants'
import { AppConfig } from './app.config'

export const { SOCKET_URL, API_URL } = Constants.expoConfig?.extra as AppConfig
