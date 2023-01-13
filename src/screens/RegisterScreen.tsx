import { Text, TouchableRipple } from 'react-native-paper'
import FlexContainer from '../components/ui/flex/FlexContainer'
import {useNavigation} from '@react-navigation/native'
import RegisterForm from '../components/forms/RegisterForm'
import { LoginRequest } from '../models/Login.model'
import { useLoginActions } from '../services/Auth.service'

const RegisterScreen = () => {
  const { postRegister } = useLoginActions()
  const { navigate } = useNavigation()

  const submitRegisterHandler = async (loginRequest: LoginRequest) => {
    const res = await postRegister(loginRequest)
    return res
  }

  const goLoginHandler = () => {
    navigate('Login' as never)
  }
  return (
    <FlexContainer style={{ paddingHorizontal: 15, paddingVertical: 25 }}>
      <Text variant="titleLarge" style={{ fontWeight: '700' }}>
        Register 
      </Text>
      <Text variant="titleMedium" style={{ paddingTop: 10 }}>
        Chat with friends is simply
      </Text>
      <FlexContainer style={{ flexDirection: 'row', paddingTop: 25 }}>
        <Text variant="bodyMedium">
          {`Already have an account? You can sign in `}
        </Text>
        <TouchableRipple onPress={goLoginHandler}>
          <Text variant="bodyMedium" style={{ fontWeight: '700' }}>
            {`Here`}
          </Text>
        </TouchableRipple>
      </FlexContainer>
      <RegisterForm onSubmit={submitRegisterHandler} />
    </FlexContainer>
  )
}
export default RegisterScreen