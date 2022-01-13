import axios, { AxiosPromise } from 'axios'
import { AuthUser } from '../components/molecules/types'
import {
  defaultUrl,
  getProfileIdUrl,
  imageUploadUrl,
  userUrl,
} from '../utils/urls'

export const userSignIn = (email: string, password: string) => {
  const postUserSignInUrl: string = userUrl + '/sign_in'

  return axios
    .post(postUserSignInUrl, {
      email: email,
      password: password,
    })
    .then((res) => {
      console.log('success')
      return res
    })
    .catch((e) => console.error(e))
}

export const userSignOut = (
  uid: string,
  accessToken: string,
  client: string,
) => {
  const deleteUserSessionUrl: string = userUrl + '/sign_out'

  return axios
    .request({
      method: 'delete',
      url: deleteUserSessionUrl,
      data: {
        uid: uid,
        'access-token': accessToken,
        client: client,
      },
    })
    .then(() => {
      console.log('success')
      return true
    })
    .catch((e) => console.error(e))
}

export const deleteUser = () => {
  return axios
    .request({
      method: 'delete',
      url: userUrl,
    })
    .then(() => {
      console.log('success')
      return true
    })
    .catch((e) => console.error(e))
}

export const changePassword = (password: string, passwordConfirm: string) => {
  const changePasswordUrl = userUrl + '/password'

  return axios
    .patch(
      changePasswordUrl,
      {
        password: password,
        password_confirmation: passwordConfirm,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then((res) => {
      return res.data
    })
    .catch((e) => console.error(e))
}

export const postPassword = (email: string) => {
  const postPasswordUrl = userUrl + '/password'
  const resetPasswordUrl = defaultUrl + 'reset_password'
  return axios
    .post(postPasswordUrl, {
      email: email,
      redirect_url: resetPasswordUrl,
    })
    .then((res) => {
      return res
    })
    .catch((e) => {
      return e
    })
}

export const resetPassword = (
  password: string,
  passwordConfirm: string,
  uid: string,
  accessToken: string,
  client: string,
) => {
  const changePasswordUrl = userUrl + '/password'
  const newToken: AuthUser = {
    token: '',
  }
  return axios
    .patch(
      changePasswordUrl,
      {
        password: password,
        password_confirmation: passwordConfirm,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          uid: uid,
          'access-token': accessToken,
          client: client,
        },
      },
    )
    .then((res) => {
      const cookies = document.cookie
      newToken.token = cookies
      return res.data
    })
    .catch((e) => console.error(e))
}

export const resetPasswordNoSignIn = (
  password: string,
  passwordConfirm: string,
) => {
  const changePasswordUrl = userUrl + '/password'

  return axios
    .patch(
      changePasswordUrl,
      {
        password: password,
        password_confirmation: passwordConfirm,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then((res) => {
      return res.data
    })
    .catch((e) => console.error(e))
}

export const createAvater = (data: FormData): AxiosPromise => {
  return axios
    .request({
      method: 'post',
      url: imageUploadUrl,
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
      data: data,
    })
    .then((res) => {
      return res
    })
    .catch((e) => {
      return e
    })
}

export const getProfile = (userId: string) => {
  return axios
    .get(getProfileIdUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        user_id: userId,
      },
    })
    .then((res) => {
      return res.data.id
    })
}
