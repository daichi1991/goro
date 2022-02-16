import { Typography } from '@material-ui/core'
import Grid from '@mui/material/Grid'
import queryString from 'query-string'
import React, { useContext, useState } from 'react'
import { Link, RouteComponentProps, useLocation } from 'react-router-dom'
import {
  LinkButton,
  linkStyle,
  linkText,
  LinkText,
  SignInForm,
  StyledInput,
  StyleSubmit,
} from '../../../components/atoms/styles'
import {
  AuthOperationContext,
  SignInErrorContext,
} from '../../../contexts/authUserContext'
import { useStyles } from '../../../utils/style'

type PageProps = Record<string, null> & RouteComponentProps<{ status: string }>

export const UserSignIn: React.FC<PageProps> = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const signIn = useContext(AuthOperationContext).signIn
  const signInCheck = useContext(SignInErrorContext)
  const location = useLocation<{ status: string }>()
  const qs = queryString.parse(location.search)
  const classes = useStyles()

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

  return (
    <>
      {/* {location.state.message?<h3>location.state.message</h3>:null} */}
      {qs.confirm === 'success' ? <h3>認証が成功しました</h3> : <span></span>}
      <h3 className={classes.pageTitleText}>ログイン</h3>
      {signInCheck ? (
        <p style={{ color: 'red' }}>
          メールアドレスないしパスワードが正しくありません
        </p>
      ) : (
        <span></span>
      )}
      <form onSubmit={(e) => userSignIn(e)}>
        <SignInForm>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography>メールアドレス</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <StyledInput type="text" value={email} onChange={handleEmail} />
            </Grid>
            <Grid item xs={12} md={12}>
              パスワード
            </Grid>
            <Grid item xs={12} md={12}>
              <StyledInput
                type="password"
                value={password}
                onChange={handlePassword}
              />
            </Grid>
          </Grid>
        </SignInForm>
        {/* <table style={tableStyle}>
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
        </table> */}
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
