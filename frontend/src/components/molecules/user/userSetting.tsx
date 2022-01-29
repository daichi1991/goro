import { Paper } from '@mui/material'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { useStyles } from '../../../utils/style'

export const UserSetting = () => {
  const classes = useStyles()
  return (
    <>
      <h3>アカウント設定</h3>
      <Paper variant="outlined" className={classes.itemListContent}>
        <Link
          to="/avater_upload"
          className={classes.itemLinkText}
          style={{ display: 'inline-block' }}
        >
          アバター画像アップロード
        </Link>
      </Paper>
      <Paper variant="outlined" className={classes.itemListContent}>
        <Link
          to="/username_setting"
          className={classes.itemLinkText}
          style={{ display: 'inline-block' }}
        >
          ユーザー名編集
        </Link>
      </Paper>
    </>
  )
}
