import React from 'react'
import { ViewStyle } from 'react-native'
import { Portal, FAB } from 'react-native-paper'
import { useTheme } from 'react-native-paper'
import { CustomThemeProps } from '../../../themes/CustomTheme'

export interface FABAction {
  icon: string
  label: string
  style?: ViewStyle
  color?: string
  onPress: () => void
}
interface Props {
  FABActions: FABAction[]
}
const BasicFloatingButton = ({ FABActions }: Props) => {
  const [state, setState] = React.useState({ open: false })
  const theme = useTheme<CustomThemeProps>()
  const onStateChange = ({ open }) => setState({ open })

  const { open } = state

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={FABActions}
        fabStyle={{ backgroundColor: theme.colors.primary }}
        color='white'
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
          }
        }}
      />
    </Portal>
  )
}

export default BasicFloatingButton
