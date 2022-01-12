import { Button, Snackbar, TextField, Typography } from '@material-ui/core'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { UserInfoContext } from '../../../contexts/authUserContext'
import { useStyles } from '../../../utils/style'

const { useState, useContext, useEffect } = React

export const UsernameSetting = () => {
  const { userInfo, postUserInfo } = useContext(UserInfoContext)
  const [username, setUsername] = useState<string>('')
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const classes = useStyles()

  const handelUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handelPostUserInfo = async () => {
    const infoSuccess = postUserInfo(userInfo.id, username)
    setOpenSnackbar(infoSuccess)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  useEffect(() => {
    setUsername(userInfo.username)
  }, [userInfo])

  return (
    <>
      <Box
        sx={{
          marginBottom: 2,
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h5" component="div">
          <Link to="/user_setting" className={classes.itemLinkIcon}>
            <ArrowBackIcon />
          </Link>
          <span className={classes.pageTitleText}>ユーザーネーム編集</span>
        </Typography>
      </Box>
      <Divider />
      <Typography variant="subtitle1" display="block" gutterBottom>
        <Box sx={{ color: 'text.secondary' }}>
          ユーザーネームは全ユーザーに公開されます。
        </Box>
      </Typography>
      <br />
      <Card sx={{ minWidth: 275, maxWidth: 400 }} variant="outlined">
        <CardContent>
          <Typography variant="caption" display="block" gutterBottom>
            <Box sx={{ color: 'text.secondary' }}>ユーザーネームを変更</Box>
          </Typography>
          <TextField
            value={username}
            defaultValue={userInfo.username}
            type="text"
            margin="dense"
            id="username-text-field"
            variant="outlined"
            onChange={handelUsername}
          />
          <br />
          <br />
          <Button variant="text">
            <Link to="/user_setting" className={classes.itemLinkText}>
              キャンセル
            </Link>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handelPostUserInfo()}
          >
            保存
          </Button>
        </CardContent>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          ユーザー名を保存しました
        </Alert>
      </Snackbar>
    </>
  )
}
