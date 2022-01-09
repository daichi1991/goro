import * as React from 'react'
import { Link } from 'react-router-dom'

export const UserSetting = () => {
  return (
    <>
      <Link to="/avater_upload">アバター画像アップロード</Link>
      <Link to="/username_setting">ユーザー名編集</Link>
    </>
  )
}
