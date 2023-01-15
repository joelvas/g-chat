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
      }
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
