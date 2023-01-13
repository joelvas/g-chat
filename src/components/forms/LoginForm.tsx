import { useState } from 'react'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextInput } from 'react-native-paper'
import FlexContainer from '../ui/flex/FlexContainer'
import FormTextInput from '../ui/form/FormTextInput'
import FlexItem from '../ui/flex/FlexItem'
import { ApiResponse } from '../../models/ErrorResponse.model'
import { LoginResponse } from '../../models/Login.model'
import { LoginRequest } from '../../models/Login.model'
import * as Yup from 'yup'

const defaultValues: LoginRequest = {
  email: '',
  password: ''
}
interface Props {
  onSubmit: (loginRequest: LoginRequest) => Promise<ApiResponse | LoginResponse>
}
const LoginForm = ({ onSubmit }: Props) => {
  const [loading, setLoading] = useState(false)
  const validation = Yup.object({
    email: Yup.string().trim().email('Must have email format').required('Email is required'),
    password: Yup.string().trim().min(6, 'Must have 6 characters min').required('Password is required')
  })

  const methods = useForm({ defaultValues, resolver: yupResolver(validation), mode: 'onSubmit' })

  const submitHandler: SubmitHandler<LoginRequest> = async (data: LoginRequest) => {
    setLoading(true)
    await onSubmit(data)
    setLoading(false)
  }

  return (
    <FormProvider {...methods}>
      <FlexContainer style={{ paddingVertical: 10 }}>
        <FlexItem>
          <FormTextInput
            name="email"
            label="Email"
            left={
              <TextInput.Icon
                size={22}
                icon="email-outline" />
            } />
        </FlexItem>
        <FlexItem>
          <FormTextInput
            name="password"
            secureTextEntry
            label="Password"
            left={
              <TextInput.Icon
                size={22}
                icon="lock-outline" />
            } />
        </FlexItem>
        <FlexItem style={{ paddingTop: 15 }}>
          <Button
            mode='contained'
            loading={loading}
            disabled={loading}
            onPress={methods.handleSubmit(submitHandler)}>
            Log in
          </Button>
        </FlexItem>
      </FlexContainer>
    </FormProvider>
  )
}
export default LoginForm