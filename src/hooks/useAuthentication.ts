import { LoginResponse } from './../models/Login.model'
import { useEffect, useState } from 'react'
import { User } from '../models/User.model'
import * as SecureStore from 'expo-secure-store'
import jwt_decode from 'jwt-decode'
import useAuthStore from '../store/useAuthStore'

const useAuthentication = () => {
  const { setToken, setIsAuthenticated, setUser } = useAuthStore()

  const readAuthentication = async () => {
    try {
      const token = await SecureStore.getItemAsync('x-token')
      const user = JSON.parse(await SecureStore.getItemAsync('user'))
      if (token) {
        const decodedToken = jwt_decode(token) as { exp: number }
        const expDate = new Date(Number(decodedToken.exp) * 1000)
        const nowDate = new Date()
        if (expDate.getTime() - nowDate.getTime() > 0) {
          storeAuthentication(user, token)
          console.log('Authenticated')
        } else {
          await removeAuthentication()
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const setAuthentication = async (res: LoginResponse) => {
    try {
      await SecureStore.setItemAsync('x-token', res.token)
      await SecureStore.setItemAsync('user', JSON.stringify(res.user))
      storeAuthentication(res.user, res.token)
      console.log('Authenticated')
      return true
    } catch (err) {
      console.log(err)
    }
  }

  const removeAuthentication = async () => {
    try {
      await SecureStore.deleteItemAsync('x-token')
      await SecureStore.deleteItemAsync('user')
      unstoreAuthentication()
      console.log('Removing token...')
      return true
    } catch (err) {
      console.log(err)
    }
  }

  const storeAuthentication = (user: User, token: string) => {
    setIsAuthenticated(true)
    setUser(user)
    setToken(token)
  }

  const unstoreAuthentication = () => {
    setIsAuthenticated(false)
    setUser(null)
    setToken('')
  }

  return {
    setAuthentication,
    removeAuthentication,
    readAuthentication
  }
}
export default useAuthentication
