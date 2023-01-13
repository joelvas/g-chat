import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'

interface Props {
  onPress: () => void
}
const BasicButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Change word</Text>
    </TouchableOpacity>
  )
}
export default BasicButton
