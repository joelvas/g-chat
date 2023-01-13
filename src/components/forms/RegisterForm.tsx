import { useState } from 'react'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextInput } from 'react-native-paper'
import FlexContainer from '../ui/flex/FlexContainer'
import FormTextInput from '../ui/form/FormTextInput'
import FlexItem from '../ui/flex/FlexItem'
import { LoginRequest, LoginResponse } from '../../models/Login.model'
import { ExpressValidatorResponse } from '../../models/ErrorResponse.model'
import * as Yup from 'yup'

const defaultValues: LoginRequest = {
  email: '',
  password: '',
  password2: '',
  name: ''
}
interface Props {
  onSubmit: (loginRequest: LoginRequest) => Promise<ExpressValidatorResponse | LoginResponse>
}
const RegisterForm = ({ onSubmit }: Props) => {
  const [loading, setLoading] = useState(false)
  const validation = Yup.object({
    name: Yup.string().trim().required("Name is required"),
    email: Yup.string().trim().email('Must have email format').required('Email is required'),
    password: Yup.string().trim().min(6, 'Must have 6 characters min').required('Password is required'),
    password2: Yup.string().trim().min(6, 'Must have 6 characters min').test('password2', 'Passwords must match', (value, ctx) => {
      const { password, password2 } = ctx.parent as LoginRequest
      return password === password2
    }).required('Password is required')
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
            name="name"
            label="Name"
            left={
              <TextInput.Icon
                size={22}
                icon="account-circle-outline" />
            } />
        </FlexItem>
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
        <FlexItem>
          <FormTextInput
            name="password2"
            secureTextEntry
            label="Repeat password"
            left={
              <TextInput.Icon
                size={22}
                icon="lock-outline" />
            } />
        </FlexItem>
        <FlexItem style={{ marginTop: 15 }}>
          <Button
            mode='contained'
            loading={loading}
            disabled={loading}
            onPress={methods.handleSubmit(submitHandler)}>
            Sign up
          </Button>
        </FlexItem>
      </FlexContainer>
    </FormProvider>
  )
}
export default RegisterForm