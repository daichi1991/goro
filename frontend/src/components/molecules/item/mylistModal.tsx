import * as React from 'react'
import { postItemMylists } from '../../../apis/itemMylist'
import { ItemType, MylistType } from '../types'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import {
  createStyles,
  makeStyles,
  Paper,
  Snackbar,
  Theme,
} from '@material-ui/core'

const { useState } = React

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: theme.spacing(2),
      padding: theme.spacing(1),
      height: 50,
      fontSize: 20,
    },
  }),
)

function Alert(props: JSX.IntrinsicAttributes & AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

interface Props {
  item: ItemType
  mylist: MylistType
}

export const MylistModal: React.FC<Props> = (props: Props) => {
  const classes = useStyles()

  const item = props.item
  const mylist = props.mylist

  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleAddToMylist = () => {
    postItemMylists(mylist.id, item.id).then(() => {
      setOpenSnackbar(true)
    })
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <>
      <Paper
        variant="outlined"
        onClick={handleAddToMylist}
        className={classes.paper}
      >
        {mylist.name}
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {mylist.name}に追加しました
        </Alert>
      </Snackbar>
    </>
  )
}
