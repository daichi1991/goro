import { AppBar, Button, Dialog, IconButton, Toolbar } from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'
import CloseIcon from '@material-ui/icons/Close'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import useMedia from 'use-media'
import { MylistsContext } from '../../../contexts/mylistContexts'
import { useStyles } from '../../../utils/style'
import { ItemType } from '../types'
import { MylistModal } from './mylistModal'

const { useState, useContext } = React

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface Props {
  item: ItemType
}

export const ItemsWrapper: React.FC<Props> = (props: Props) => {
  const isWide = useMedia({ minWidth: '750px' })

  const [open, setOpen] = useState(false)
  const { mylistsState } = useContext(MylistsContext)

  const [expanded, setExpanded] = React.useState<string | false>('panel1')

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    newExpanded: boolean,
  ) => {
    setExpanded(newExpanded ? panel : false)
  }

  const classes = useStyles()

  const item = props.item

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

  return (
    <>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{item.title}</Typography>
          <Button
            onClick={handleOpenForm}
            style={{ position: 'absolute' }}
            className={classes.addMylistBtn}
          >
            <LibraryAddIcon />
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
      {isWide ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">マイリストに追加</DialogTitle>
          <DialogContent>
            {mylistsState.length ? (
              mylistsState.map((mylist, index) => (
                <MylistModal key={index} mylist={mylist} item={item} />
              ))
            ) : (
              <></>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              キャンセル
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.addMylistAppBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.addMylistTitle}>
                マイリストに追加
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>
            {mylistsState.length ? (
              mylistsState.map((mylist, index) => (
                <MylistModal key={index} mylist={mylist} item={item} />
              ))
            ) : (
              <></>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
