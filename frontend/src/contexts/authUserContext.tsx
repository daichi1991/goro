import axios from 'axios'
import * as React from 'react'
import { AuthUser, UserType } from '../components/molecules/types'
import {
  currentUserUrl,
  myProfileUrl,
  userInfoUrl,
  userUrl,
} from '../utils/urls'

const { createContext, useState, useEffect } = React

export const AuthUserContext = createContext<boolean>(false)
export const MyProfileIdContext = createContext<string>('')
export const SignInErrorContext = createContext<boolean>(false)

type UserInfo = {
  userInfo: UserType
  getUserInfo: () => void
  postUserInfo: (id: string, username: string) => boolean
}

const defaultUserInfo: UserInfo = {
  userInfo: { id: '', username: '' },
  getUserInfo: () => console.error('Proveiderが設定されていません'),
  postUserInfo: () => false,
}

export const UserInfoContext = createContext<UserInfo>(defaultUserInfo)
export const SignInCheckContext = createContext<boolean>(false)

type OperationType = {
  signUpConfirm: (token: string | null) => void
  signIn: (email: string, password: string) => void
  signOut: () => void
  getSignInCheck: () => void
  postUserInfo: (id: string, username: string) => boolean
}

export const AuthOperationContext = createContext<OperationType>({
  signUpConfirm: () => console.error('Proveiderが設定されていません'),
  signIn: () => console.error('Proveiderが設定されていません'),
  signOut: () => console.error('Providerが設定されていません'),
  getSignInCheck: () => console.error('Providerが設定されていません'),
  postUserInfo: () => false,
})

export const signUp = (
  email: string,
  password: string,
  passwordConfirm: string,
) => {
  return axios
    .post(
      userUrl,
      {
        user: {
          email: email,
          password: password,
          password_confirmation: passwordConfirm,
        },
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
    .then((res) => {
      return res
    })
}

export const resendConfirmMail = (email: string) => {
  const resendUrl = userUrl + '/resend_confirmation'
  return axios
    .post(
      resendUrl,
      {
        email: email,
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
    .catch((e) => {
      return e
    })
}

const AuthUserProvider: React.FC = (children) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [signInError, setSignInError] = useState<boolean>(false)
  const [myProfileId, setMyProfileId] = useState<string>('')
  const [userInfo, setUserInfo] = useState<UserType>({ id: '', username: '' })
  const [userInfoSuccess, setUserInfoSuccess] = useState<boolean>(false)
  const [signInCheck, setSignInCheck] = useState<boolean>(false)

  const userToken: AuthUser = {
    token: '',
  }

  const postUserSignInUrl: string = userUrl + '/sign_in.json'

  const signUpConfirm = (confirmationToken: string | null) => {
    const getUserConfirmUrl =
      userUrl + '/confirmation?confirmation_token=' + confirmationToken
    axios
      .get(getUserConfirmUrl)
      .then((res) => {
        return res
      })
      .catch((e) => {
        return e
      })
  }

  const signIn = (email: string, password: string) =>
    axios
      .post(
        postUserSignInUrl,
        {
          user: {
            email: email,
            password: password,
          },
        },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        setSignInError(false)
        setIsAuthenticated(true)
      })
      .then((res) => {
        userToken.token = 'nowSignIn'
        return res
      })
      .catch((e) => {
        console.error(e)
        setSignInError(true)
      })

  const signOut = () => {
    const deleteUserSessionUrl: string = userUrl + '/sign_out.json'
    return axios
      .delete(deleteUserSessionUrl, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then((res) => {
        setIsAuthenticated(false)
        return res
      })
      .catch((e) => console.error(e))
  }

  const getSignInCheck = () => {
    const signInCheckUrl: string = userInfoUrl + 'sign_in_check.json'
    let tmpAuthUser: string | null = null

    axios
      .get(signInCheckUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        tmpAuthUser = res.data.data
        if (tmpAuthUser) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      })
    setSignInCheck(true)
  }

  const getMyProfile = () => {
    axios
      .get(myProfileUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        setMyProfileId(res.data.id)
      })
  }

  const getUserInfo = () => {
    axios
      .get(currentUserUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        setUserInfo({ id: res.data.id, username: res.data.username })
      })
  }

  const postUserInfo = (id: string, username: string) => {
    const postUserUrl = userInfoUrl + id + '.json'
    axios
      .put(
        postUserUrl,
        {
          user: {
            id: id,
            username: username,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      .then(() => {
        setUserInfoSuccess(true)
      })
      .catch(() => {
        setUserInfoSuccess(false)
      })
    return userInfoSuccess
  }

  useEffect(() => {
    getSignInCheck()
    isAuthenticated && getMyProfile()
    getUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthOperationContext.Provider
      value={{
        signUpConfirm,
        signIn,
        signOut,
        getSignInCheck,
        postUserInfo,
      }}
    >
      <AuthUserContext.Provider value={isAuthenticated}>
        <SignInCheckContext.Provider value={signInCheck}>
          <MyProfileIdContext.Provider value={myProfileId}>
            <UserInfoContext.Provider
              value={{ userInfo, getUserInfo, postUserInfo }}
            >
              <SignInErrorContext.Provider value={signInError}>
                {children.children}
              </SignInErrorContext.Provider>
            </UserInfoContext.Provider>
          </MyProfileIdContext.Provider>
        </SignInCheckContext.Provider>
      </AuthUserContext.Provider>
    </AuthOperationContext.Provider>
  )
}

export default AuthUserProvider
