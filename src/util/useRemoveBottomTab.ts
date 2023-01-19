import { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const useRemoveBottomTab = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    let parentNav = navigation.getParent()
    parentNav.setOptions({
      tabBarStyle: { display: 'none' }
    })

    return () => {
      parentNav.setOptions({
        tabBarStyle: { display: 'flex' }
      })
    }
  }, [])

  return null
}

export default useRemoveBottomTab
