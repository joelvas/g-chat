import { View, TouchableOpacity, Image } from 'react-native'
import { Text, Card, useTheme } from 'react-native-paper'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import { CustomThemeProps } from '../../themes/CustomTheme'
import { useNavigation } from '@react-navigation/native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'

type Props = NativeStackHeaderProps & {
  title: string
  image: string
}

const CustomStackHeader = ({ title, image, ...props }: Props) => {
  const navigation = useNavigation()
  const theme = useTheme<CustomThemeProps>()
  return (
    <Card style={{ backgroundColor: theme.colors.white }}>
      <View {...props} style={{ height: 55, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Start' as never, {} as never)} style={{marginLeft: 10}}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
          />
        </TouchableOpacity>
        <Image style={{ marginLeft: 15, width: 40, height: 40, borderRadius: 15 }} source={{ uri: image }} />
        <Text variant="titleLarge" style={{ fontWeight: '700', color: theme.colors.onSurface, paddingLeft: 13 }}>{title ? title : 'Room...'}</Text>
      </View>
    </Card>
  )
}
export default CustomStackHeader