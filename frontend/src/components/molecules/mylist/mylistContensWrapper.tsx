import { Avatar, Dialog, makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import { Star, StarBorder, StarHalf } from '@material-ui/icons'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import PersonIcon from '@mui/icons-material/Person'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { deleteItemMylist, patchItemMylists } from '../../../apis/itemMylist'
import { getProfile } from '../../../apis/user'
import { MylistContentsContext } from '../../../contexts/mylistContensContexts'
import { MylistContentsType, MylistItemType } from '../types'

const { useContext, useEffect, useState } = React

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avaterBtn: {
    position: 'absolute',
    right: '140px',
    top: '50%',
    transform: 'translate(0, -50%)',
  },
  memoryBtn: {
    position: 'absolute',
    right: '64px',
    top: '50%',
    transform: 'translate(0, -50%)',
  },
  menuBtn: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translate(0, -50%)',
  },
  deleteBtn: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translate(0, -50%)',
    color: '#c1c1c1',
  },
}))

interface Props {
  item: MylistItemType
}

interface MemoryIconProps {
  memoryLevel: number
}

const MemoryIcon = (props: MemoryIconProps) => {
  let memIcon
  switch (props.memoryLevel) {
    case 0:
      memIcon = <StarBorder />
      break
    case 1:
      memIcon = <StarHalf />
      break
    case 2:
      memIcon = <Star />
      break
    default:
      memIcon = <StarBorder />
      break
  }
  return memIcon
}

export const MylistContentsWrapper: React.FC<Props> = (props: Props) => {
  const item = props.item
  const { mylistContentsState, setMylistContents } = useContext(
    MylistContentsContext,
  )

  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const [profileId, setProfileId] = useState<string | null>(null)
  const [avaterImageUrl, setAvaterImageUrl] = useState<string>('')

  const [userItemUrl, setUserItemUrl] = useState<string>('')

  const getMyprofileImage = async () => {
    const tmpProfileId = await getProfile(item.item_user_id)
    setUserItemUrl(`/users/items/${item.item_user_id}`)
    setAvaterImageUrl(
      `http://localhost:3000/uploads/profile/image/${tmpProfileId}/avater.jpg`,
    )
    setProfileId(tmpProfileId)
  }

  const handleDeleteMylistContent = () => {
    const newMylistContents: MylistContentsType = { id: '', name: '' }
    newMylistContents.id = mylistContentsState.id
    newMylistContents.name = mylistContentsState.name

    if (mylistContentsState.items) {
      const allMylistContents = [...mylistContentsState.items]
      const targetIndex: number = allMylistContents.findIndex(
        ({ item_mylist_id }) => item_mylist_id === item.item_mylist_id,
      )
      allMylistContents.splice(targetIndex, 1)

      deleteItemMylist(item.item_mylist_id)

      newMylistContents.items = allMylistContents

      setMylistContents(newMylistContents)
    }
  }

  const handleMemoryLevel = () => {
    let memoryLevel = item.memory_level
    memoryLevel < 2 ? (memoryLevel += 1) : (memoryLevel = 0)
    patchItemMylists(
      item.item_mylist_id,
      mylistContentsState.id,
      item.id,
      memoryLevel,
    )

    const mylistContentItems = mylistContentsState.items
      ? [...mylistContentsState.items]
      : undefined
    const newMylistContent: MylistContentsType = {
      id: mylistContentsState.id,
      name: mylistContentsState.name,
      items: mylistContentItems,
    }
    if (newMylistContent.items) {
      const itemIndex =
        newMylistContent.items &&
        newMylistContent.items.findIndex(
          ({ item_mylist_id }) => item_mylist_id === item.item_mylist_id,
        )
      newMylistContent.items[itemIndex].memory_level = memoryLevel
      setMylistContents(newMylistContent)
    }
  }

  const handleOpenForm = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }))

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }))

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }))

  useEffect(() => {
    getMyprofileImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Accordion>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{item.title}</Typography>
            <Link to={userItemUrl} className={classes.avaterBtn}>
              {profileId ? (
                <Avatar src={avaterImageUrl} />
              ) : (
                <Avatar>
                  <PersonIcon />
                </Avatar>
              )}
            </Link>
            <Button onClick={handleMemoryLevel} className={classes.memoryBtn}>
              <MemoryIcon memoryLevel={item.memory_level} />
            </Button>
            <Button onClick={handleOpenForm} className={classes.menuBtn}>
              <MoreHorizIcon />
            </Button>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {item.year_type === '紀元前' ? '紀元前' : ''}
              {item.year}
              {item.year_type === '紀元前' || item.year_type === '紀元後'
                ? '年'
                : item.year_type}
              <br />
              {item.goro_text}
              <br />
              {item.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          マイリストからゴロを削除しますか？
        </DialogTitle>
        <DialogContent>
          <DialogActions>
            <Typography>
              <Button
                onClick={handleClose}
                color="primary"
                style={{ position: 'absolute', left: '20px' }}
              >
                キャンセル
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={handleDeleteMylistContent}
              >
                完了
              </Button>
            </Typography>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
