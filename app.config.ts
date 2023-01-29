import 'dotenv/config'

export interface AppConfig {
  API_URL: string
  SOCKET_URL: string
}

const API_URL = process.env.API_URL
const SOCKET_URL = process.env.SOCKET_URL

export default () => ({
  expo: {
    name: 'Gchat',
    slug: 'GChat',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    extra: {
      eas: {
        projectId: 'a720a26e-b69c-4632-914a-5caa85c78ab7'
      },
      API_URL,
      SOCKET_URL
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF'
      },
      useNextNotificationsApi: true,
      package: 'com.joelvas.gchat',
      versionCode: 1
    },
    notification: {
      icon: './assets/icon.png',
      color: '#fff'
    },
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    }
  }
})
