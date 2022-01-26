import Button from '@material-ui/core/Button'
import * as H from 'history'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  LinkButton,
  linkStyle,
  StyledInput,
  StyleSignUpError,
  StyleSubmit,
  tableStyle,
} from '../../../components/atoms/styles'
import { resendConfirmMail, signUp } from '../../../contexts/authUserContext'

const { useState } = React

interface Props {
  history: H.History
}

export const UserSignUp: React.FC<Props> = (props: Props) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [registerDuplication, setRegisterDuplication] = useState<boolean>(false)
  const [sendConfirmMessage, setSendConfrimMessage] = useState<string>('')
  const [formLock, setFormLock] = useState<boolean>(false)
  const [alreadyRegisterd, setAlreadyRegisterd] = useState<boolean>(false)

  const userSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signUp(email, password, passwordConfirm)
      .then((res) => {
        if (res.data.status === 'success') {
          props.history.replace('/sign_up_send_mail')
        }
      })
      .catch((e) => {
        const already: boolean = e.response.data.already
        const confirmed: boolean = e.response.data.confirmed
        if (already) {
          if (!confirmed) {
            setRegisterDuplication(true)
            setFormLock(true)
          } else {
            setAlreadyRegisterd(true)
          }
        }
      })
  }

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handlePasswordConfirm = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirm(event.target.value)
  }

  const handleResendConfirmMail = () => {
    resendConfirmMail(email).then((res) => {
      console.log(res)
      const resendConfirmSuccess: boolean = res.send
      if (resendConfirmSuccess) {
        setSendConfrimMessage('送信が完了しました')
      } else {
        setSendConfrimMessage('送信に失敗しました')
      }
    })
    setFormLock(false)
  }

  const canselResendConfirm = () => {
    setFormLock(false)
    setRegisterDuplication(false)
  }

  return (
    <>
      <h3>ユーザー登録</h3>

      <form onSubmit={(e) => userSignUp(e)}>
        <table style={tableStyle}>
          <tr>
            <td>メールアドレス</td>
            <td>
              <StyledInput
                type="text"
                value={email}
                onChange={handleEmail}
                disabled={formLock}
              />
            </td>
          </tr>
          <tr>
            <td>パスワード</td>
            <td>
              <StyledInput
                type="password"
                value={password}
                onChange={handlePassword}
                disabled={formLock}
              />
            </td>
          </tr>
          <tr>
            <td>パスワード確認</td>
            <td>
              <StyledInput
                type="password"
                value={passwordConfirm}
                onChange={handlePasswordConfirm}
                disabled={formLock}
              />
            </td>
          </tr>
        </table>
        {password === passwordConfirm ? (
          <StyleSubmit type="submit" value="登録" />
        ) : (
          <StyleSubmit type="submit" value="登録" disabled />
        )}
      </form>
      {registerDuplication && !sendConfirmMessage && (
        <StyleSignUpError>
          既にユーザー登録されていますが、認証が完了していません。
          <br />
          認証メールを再送しますか？
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={handleResendConfirmMail}
          >
            再送
          </Button>
          <Button variant="text" color="primary" onClick={canselResendConfirm}>
            キャンセル
          </Button>
        </StyleSignUpError>
      )}
      {sendConfirmMessage && (
        <StyleSignUpError>{sendConfirmMessage}</StyleSignUpError>
      )}
      {alreadyRegisterd && (
        <StyleSignUpError>
          このメールアドレスは既に登録されています。
        </StyleSignUpError>
      )}
      <Link to="/sign_in" style={linkStyle}>
        <LinkButton>ログイン画面へ</LinkButton>
      </Link>
    </>
  )
}
