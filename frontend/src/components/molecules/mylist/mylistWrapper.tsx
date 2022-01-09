import { Button, Paper, Popover } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import { PopupState as PopupStateType } from 'material-ui-popup-state/core'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { deleteMylist } from '../../../apis/mylist'
import { MylistsContext } from '../../../contexts/mylistContexts'
import { useStyles } from '../../../utils/style'
import { MylistType } from '../types'

interface Props {
  mylist: MylistType
}

export const MylistWrapper: React.FC<Props> = (props: Props) => {
  const mylist = props.mylist
  const { mylistsState, setMylists } = React.useContext(MylistsContext)
  const classes = useStyles()

  const handleDeleteMylist = () => {
    const newMylists = [...mylistsState]
    const targetIndex: number = newMylists.findIndex(
      ({ id }) => id === mylist.id,
    )
    newMylists.splice(targetIndex, 1)

    deleteMylist(mylist.id)
    setMylists(newMylists)
  }

  return (
    <>
      <div>
        <Paper variant="outlined" className={classes.itemListContent}>
          <Link
            to={`/mylist/show/${mylist.id}`}
            className={classes.itemLinkText}
            style={{ display: 'inline-block' }}
          >
            {mylist.name}
          </Link>

          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState: PopupStateType) => (
              <span className={classes.mylistContentBtn}>
                <Button {...bindTrigger(popupState)}>
                  <MoreHorizIcon />
                </Button>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Box p={2}>
                    <Typography>
                      <div onClick={handleDeleteMylist}>削除</div>
                    </Typography>
                  </Box>
                </Popover>
              </span>
            )}
          </PopupState>
        </Paper>
      </div>
    </>
  )
}
