import * as H from 'history'
import queryString from 'query-string'
import * as React from 'react'
import { Link, RouteComponentProps, useLocation } from 'react-router-dom'
import {
  LinkButton,
  linkStyle,
  linkText,
  LinkText,
  StyledInput,
  StyleSubmit,
  tableStyle,
} from '../../../components/atoms/styles'
import {
  SignInErrorContext,
  useSignIn,
} from '../../../contexts/authUserContext'

const { useState, useContext } = React

interface Props {
  history: H.History
  urlProps: RouteComponentProps<{ status: string }>
}

type PageProps = Record<string, null> & RouteComponentProps<{ status: string }>

export const UserSignIn: React.FC<PageProps> = (props: PageProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const signIn = useSignIn(email, password)
  const signInCheck = useContext(SignInErrorContext)
  const location = useLocation<{ status: string }>()
  const qs = queryString.parse(location.search)

  const userSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signIn(email, password)
  }

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const accountConfirmCheck = () => {
    const confirmParam = window.location.search
    if (confirmParam === '?account_confirmation_success=true') {
      return true
    }
    return false
  }

  return (
    <>
      {/* {location.state.message?<h3>location.state.message</h3>:null} */}
      {qs.confirm === 'success' ? <h3>認証が成功しました</h3> : <span></span>}
      <h3>ログイン</h3>
      {signInCheck ? (
        <p style={{ color: 'red' }}>
          メールアドレスないしパスワードが正しくありません
        </p>
      ) : (
        <span></span>
      )}
      <form onSubmit={(e) => userSignIn(e)}>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td>メールアドレス</td>
              <td>
                <StyledInput type="text" value={email} onChange={handleEmail} />
              </td>
            </tr>
            <tr>
              <td>パスワード</td>
              <td>
                <StyledInput
                  type="password"
                  value={password}
                  onChange={handlePassword}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <StyleSubmit type="submit" value="ログイン" />
      </form>
      <Link to="/sign_up" style={linkStyle}>
        <LinkButton>ユーザ登録画面へ</LinkButton>
      </Link>
      <Link to="/reset_password_confirm" style={linkText}>
        <LinkText>パスワードをお忘れですか？</LinkText>
      </Link>
    </>
  )
}
