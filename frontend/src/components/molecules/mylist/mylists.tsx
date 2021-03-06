import { Snackbar } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import * as React from 'react'
import { StaticContext } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { getMylists, postMylists } from '../../../apis/mylist'
import { MylistsContext } from '../../../contexts/mylistContexts'
import { MylistWrapper } from './mylistWrapper'

const { useContext, useState } = React

function Alert(props: JSX.IntrinsicAttributes & AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

interface MylistLocationState {
  mylistLocationState: string
}

export const Mylists = (
  props: RouteComponentProps<{}, StaticContext, MylistLocationState>,
) => {
  const [open, setOpen] = useState(false)
  const { mylistsState, setMylists } = useContext(MylistsContext)

  const [mylistName, setMylistName] = useState('')

  const [openSnackbar, setOpenSnackbar] = useState(true)

  const handleOpenForm = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleMylistName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMylistName(event.target.value)
  }

  const handleAddMylist = async () => {
    await postMylists(mylistName).then(() => {
      getMylists().then((data) => {
        setMylists(data)
      })
      setMylistName('')
      setOpen(false)
    })
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <>
      <h3>マイリスト</h3>
      <Button variant="outlined" color="primary" onClick={handleOpenForm}>
        マイリスト作成
      </Button>
      {mylistsState.length ? (
        <div>
          {mylistsState?.map((mylist, index) => (
            <MylistWrapper key={index} mylist={mylist} />
          ))}
        </div>
      ) : (
        <span></span>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">マイリスト新規作成</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={mylistName}
            margin="dense"
            id="mylist-name-text-field"
            label="マイリスト名"
            type="text"
            fullWidth
            onChange={handleMylistName}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="primary"
            onClick={handleClose}
            style={{ position: 'absolute', left: '20px' }}
          >
            キャンセル
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddMylist()}
          >
            作成
          </Button>
        </DialogActions>
      </Dialog>
      {props.location.state ? (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            {props.location.state.mylistLocationState}を削除しました。
          </Alert>
        </Snackbar>
      ) : (
        <span></span>
      )}
    </>
  )
}
