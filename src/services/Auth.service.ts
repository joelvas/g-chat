import axios, { AxiosError, AxiosResponse } from 'axios'
import { LoginRequest, LoginResponse } from '../models/Login.model'
import {
  ExpressValidatorResponse,
  ApiResponse
} from '../models/ErrorResponse.model'
import { User } from '../models/User.model'
import useNotificacionStore from '../store/useNotificationStore'

export const useLoginActions = () => {
  const { notifySuccess, notifyError } = useNotificacionStore()

  const postLogin = async (
    loginRequest: LoginRequest
  ): Promise<ApiResponse | LoginResponse> => {
    return await axios
      .post(`/auth/login`, loginRequest)
      .then((res: AxiosResponse<LoginResponse>) => {
        notifySuccess({ message: 'You logged in successfully' })
        return res.data
      })
      .catch((err: unknown) => {
        const error = err as AxiosError<ApiResponse>
        notifyError({ message: error.response.data.message })
        console.log(error.response.data)
        return error.response.data
      })
  }

  const postRegister = async (
    loginRequest: LoginRequest
  ): Promise<ExpressValidatorResponse | LoginResponse> => {
    return await axios
      .post(`/users`, loginRequest)
      .then((res: AxiosResponse<LoginResponse>) => {
        notifySuccess({ message: 'Your register was successfully' })
        return res.data
      })
      .catch((err: AxiosError<ExpressValidatorResponse>) => {
        const errors = err.response.data.errors
        if (errors && errors.length) {
          errors.forEach((error) => {
            notifyError({ message: error.msg })
          })
        } else {
          notifyError({ message: `${err.response.data}` })
        }
        console.log(err.response.data)
        return err.response.data
      })
  }

  const getUser = async (): Promise<ApiResponse | User> => {
    return await axios
      .get(`/auth/user`)
      .then((res: AxiosResponse<User>) => {
        return res.data
      })
      .catch((err: AxiosError<ApiResponse>) => {
        notifyError({ message: err.response.data.message })
        return err.response.data
      })
  }

  return { postLogin, postRegister, getUser }
}
