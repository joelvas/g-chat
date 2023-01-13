import { Text, TouchableRipple } from 'react-native-paper'
import FlexContainer from '../components/ui/flex/FlexContainer'
import LoginForm from '../components/forms/LoginForm'
import { LoginRequest, LoginResponse } from '../models/Login.model'
import { useLoginActions } from '../services/Auth.service'
import { useNavigation } from '@react-navigation/native'
import useAuthentication from '../hooks/useAuthentication'

const LoginScreen = () => {
  const { postLogin } = useLoginActions()
  const { navigate } = useNavigation()
  const { setAuthentication } = useAuthentication()

  const submitLoginHandler = async (loginRequest: LoginRequest) => {
    const res = await postLogin(loginRequest) as LoginResponse
    const success = !!res.user ? await setAuthentication(res) : false
    return res
  }

  const goRegisterHandler = () => {
    navigate('Register' as never)
  }

  return (
    <FlexContainer style={{ paddingHorizontal: 15, paddingVertical: 25 }}>
      <Text variant="titleLarge" style={{ fontWeight: '700' }}>
        Sign in to
      </Text>
      <Text variant="titleMedium" style={{ paddingTop: 10 }}>
        Chat with friends is simply
      </Text>
      <FlexContainer style={{ flexDirection: 'row', paddingTop: 25 }}>
        <Text variant="bodyMedium">
          {`If you don't have an account, you can register `}
        </Text>
        <TouchableRipple onPress={goRegisterHandler}>
          <Text variant="bodyMedium" style={{ fontWeight: '700' }}>
            {`Here`}
          </Text>
        </TouchableRipple>
      </FlexContainer>
      <LoginForm onSubmit={submitLoginHandler} />
    </FlexContainer>
  )
}
export default LoginScreen