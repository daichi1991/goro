import { Button, Dialog } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import { FilterList, Star, StarBorder, StarHalf } from '@material-ui/icons'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import * as H from 'history'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import { PopupState as PopupStateType } from 'material-ui-popup-state/core'
import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getItemMylistShow } from '../../../apis/itemMylist'
import { deleteMylist } from '../../../apis/mylist'
import { MylistContentsContext } from '../../../contexts/mylistContensContexts'
import {
  MylistOperationContext,
  MylistsContext,
} from '../../../contexts/mylistContexts'
import { useStyles } from '../../../utils/style'
import { MylistContentsType, MylistItemType } from '../types'
import { MylistContentsWrapper } from './mylistContensWrapper'

const { useEffect, useState } = React

interface Props {
  history: H.History
}

interface ParamTypes {
  mylistId: string
}

export const MylistContents: React.FC<Props> = (props: Props) => {
  const { mylistId } = useParams<ParamTypes>()
  const { mylistContentsState, setMylistContents } = React.useContext(
    MylistContentsContext,
  )
  const [mylistItems, setMylistItems] = useState<MylistContentsType>({
    id: '',
    name: '',
  })
  const { mylistsState, setMylists } = React.useContext(MylistsContext)
  const [displayOrder, setDisplayOrder] = useState<string>('mylistId')
  const [openEditMylistName, setOpenEditMylistName] = useState(false)
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [newMylistName, setNewMylistName] = useState<string>(
    MylistContents.name,
  )
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [filterStar, setFilterStar] = useState({
    noStar: false,
    halfStar: false,
    fullStar: false,
  })
  const [yearTypeStart, setYearTypeStart] = useState<string>('??????')
  const [yearTypeEnd, setYearTypeEnd] = useState<string>('??????')
  const [yearStart, setYearStart] = useState<number | null>(null)
  const [yearEnd, setYearEnd] = useState<number | null>(null)
  const [yearStartDisabled, setYearStartDisabled] = useState<boolean>(true)
  const [yearEndDisabled, setYearEndDisabled] = useState<boolean>(true)
  const [filterOn, setFilterOn] = useState<boolean>(false)
  const open = Boolean(anchorEl)
  const putMylist = useContext(MylistOperationContext).putMylist
  const classes = useStyles()

  useEffect(() => {
    getItemMylistShow(mylistId).then((data) => {
      setMylistContents(data)
      setMylistItems(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePutMylists = () => {
    const newMylists = mylistContentsState
    newMylists.name = newMylistName
    putMylist(mylistContentsState.id, newMylistName)
    setMylistItems(newMylists)
    setOpenEditMylistName(false)
  }

  const handleDeleteMylist = () => {
    const newMylists = [...mylistsState]
    const targetIndex: number = newMylists.findIndex(
      ({ id }) => id === mylistId,
    )
    newMylists.splice(targetIndex, 1)

    deleteMylist(mylistId)
    setMylists(newMylists)
    props.history.replace({
      pathname: '/mylists',
      state: { mylistLocationState: mylistContentsState.name },
    })
  }

  const handleChangeDisplayOrder = (event: SelectChangeEvent) => {
    const changeValue = event.target.value
    setDisplayOrder(changeValue)

    const mylistContentItems = mylistItems.items
      ? [...mylistItems.items]
      : undefined
    const newMylistContent: MylistContentsType = {
      id: mylistItems.id,
      name: mylistItems.name,
      items: mylistContentItems,
    }
    if (mylistContentItems) {
      if (changeValue === 'mylistId') {
        const orderByMylistId = mylistContentItems.sort((a, b) => {
          return a.item_mylist_id < b.item_mylist_id ? -1 : 1
        })
        newMylistContent.items = orderByMylistId
      } else if (changeValue === 'yearAsc') {
        const orderByYear = mylistContentItems.sort((a, b) => {
          return a.year_for_sort < b.year_for_sort ? -1 : 1
        })
        newMylistContent.items = orderByYear
      } else if (changeValue === 'yearDesc') {
        const orderByYear = mylistContentItems.sort((a, b) => {
          return a.year_for_sort < b.year_for_sort ? 1 : -1
        })
        newMylistContent.items = orderByYear
      } else if (changeValue === 'title') {
        const orderByTitle = mylistContentItems.sort((a, b) => {
          return a.title < b.title ? -1 : 1
        })
        newMylistContent.items = orderByTitle
      }
    }
    setMylistItems(newMylistContent)
  }

  const handleFilterContents = () => {
    const mylistContentItems = mylistContentsState.items
      ? [...mylistContentsState.items]
      : undefined
    let arrayFilterBy = mylistContentItems

    if (arrayFilterBy) {
      arrayFilterBy = filterByMemory(arrayFilterBy)

      if (yearTypeStart != '??????' && yearStart != null) {
        const d = new Date()
        const nowYear = d.getFullYear()
        let yearForSort: number | null = null

        switch (yearTypeStart) {
          case '?????????':
            yearForSort = yearStart
            break
          case '?????????':
            yearForSort = 0 - yearStart
            break
          case '??????':
            yearForSort = nowYear - yearStart
            break
          case '?????????':
            yearForSort = nowYear - yearStart * 10000
            break
          case '?????????':
            yearForSort = nowYear - yearStart * 100000000
            break
        }
        arrayFilterBy = filterByYearStart(arrayFilterBy, yearForSort)
      }

      if (yearTypeEnd != '??????' && yearEnd != null) {
        const d = new Date()
        const nowYear = d.getFullYear()
        let yearForSort: number | null = null

        switch (yearTypeEnd) {
          case '?????????':
            yearForSort = yearEnd
            break
          case '?????????':
            yearForSort = 0 - yearEnd
            break
          case '??????':
            yearForSort = nowYear - yearEnd
            break
          case '?????????':
            yearForSort = nowYear - yearEnd * 10000
            break
          case '?????????':
            yearForSort = nowYear - yearEnd * 100000000
            break
        }
        arrayFilterBy = filterByYearEnd(arrayFilterBy, yearForSort)
      }
    }

    const newMylistContent: MylistContentsType = {
      id: mylistContentsState.id,
      name: mylistContentsState.name,
      items: arrayFilterBy,
    }

    setMylistItems(newMylistContent)
    setFilterOn(true)
    handleClose()
  }

  const filterByMemory = (inputArray: MylistItemType[]) => {
    const starArray: number[] = []
    if (filterStar.noStar) {
      starArray.push(0)
    }
    if (filterStar.halfStar) {
      starArray.push(1)
    }
    if (filterStar.fullStar) {
      starArray.push(2)
    }

    const tmpArray = [...inputArray]

    const outputArray = tmpArray.filter(function (tmp) {
      return starArray.includes(tmp.memory_level)
    })

    return outputArray
  }

  const filterByYearStart = (
    inputArray: MylistItemType[],
    yearStart: number | null,
  ) => {
    if (!yearStart) {
      return inputArray
    }
    const outputArray = inputArray.filter((mylistItem) => {
      return mylistItem.year_for_sort >= yearStart
    })

    return outputArray
  }

  //???????????????????????????
  const filterByYearEnd = (
    inputArray: MylistItemType[],
    yearEnd: number | null,
  ) => {
    if (!yearEnd) {
      return inputArray
    }

    const outputArray = inputArray.filter((mylistItem) => {
      return mylistItem.year_for_sort <= yearEnd
    })

    return outputArray
  }

  const handleOpenEditMylistName = () => {
    setOpenEditMylistName(true)
  }

  const handleCloseEditMylistName = () => {
    setOpenEditMylistName(false)
  }

  const handleOpenDeleteConfirm = () => {
    setOpenDeleteConfirm(true)
  }

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false)
  }

  const handleNewMylistName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMylistName(event.target.value)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangeStar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterStar({
      ...filterStar,
      [event.target.name]: event.target.checked,
    })
  }

  const { noStar, halfStar, fullStar } = filterStar

  const handleChangeYearTypeStart = (event: SelectChangeEvent) => {
    setYearTypeStart(event.target.value)
    if (event.target.value === '??????') {
      setYearStartDisabled(true)
    } else {
      setYearStartDisabled(false)
    }
  }

  const handleChangeYearStart = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setYearStart(parseInt(event.target.value))
  }

  const handleChangeYearTypeEnd = (event: SelectChangeEvent) => {
    setYearTypeEnd(event.target.value)
    if (event.target.value === '??????') {
      setYearEndDisabled(true)
    } else {
      setYearEndDisabled(false)
    }
  }

  const handleChangeYearEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYearEnd(parseInt(event.target.value))
  }

  const handelClearFilter = () => {
    setFilterStar({
      noStar: false,
      halfStar: false,
      fullStar: false,
    })
    setYearTypeStart('??????')
    setYearTypeEnd('??????')
    setYearStart(null)
    setYearEnd(null)
    setYearStartDisabled(true)
    setYearEndDisabled(true)
    setFilterOn(false)

    setMylistItems(mylistContentsState)
  }

  return (
    <>
      <Link to="/mylists" className={classes.itemLinkIcon}>
        <ArrowBackIcon />
      </Link>
      <Typography variant="h4" component="span">
        {mylistContentsState.name}
      </Typography>
      <PopupState variant="popover" popupId="menu-popup-popover">
        {(popupState: PopupStateType) => (
          <div>
            <Button
              variant="text"
              {...bindTrigger(popupState)}
              className={classes.mylistMenubtn}
              style={{ position: 'absolute' }}
            >
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
                  <div onClick={handleOpenEditMylistName}>
                    ???????????????????????????
                  </div>
                  <div onClick={handleOpenDeleteConfirm}>??????</div>
                </Typography>
              </Box>
            </Popover>
          </div>
        )}
      </PopupState>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={displayOrder}
          onChange={handleChangeDisplayOrder}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={'mylistId'}>????????????????????????</MenuItem>
          <MenuItem value={'yearAsc'}>????????????</MenuItem>
          <MenuItem value={'yearDesc'}>????????????</MenuItem>
          <MenuItem value={'title'}>???????????????</MenuItem>
        </Select>
      </FormControl>

      <Button
        id="filter-menu"
        aria-label="filter-menu"
        aria-controls="filter-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenu}
        color="inherit"
      >
        <FilterList />
      </Button>

      <Menu
        id="filter-menu"
        aria-aria-labelledby="filter-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          <FormControl component="fieldset">
            <Box>
              <FormLabel component="legend">?????????</FormLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={noStar}
                    onChange={handleChangeStar}
                    name="noStar"
                  />
                }
                label={<StarBorder />}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={halfStar}
                    onChange={handleChangeStar}
                    name="halfStar"
                  />
                }
                label={<StarHalf />}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fullStar}
                    onChange={handleChangeStar}
                    name="fullStar"
                  />
                }
                label={<Star />}
              />
            </Box>
            <Box>
              <FormLabel component="legend">??????</FormLabel>
              <FormControl
                variant="standard"
                sx={{ display: 'flex', flexDirection: 'row' }}
              >
                <Select
                  labelId="year-type-start-label"
                  id="year-type-start"
                  value={yearTypeStart}
                  onChange={handleChangeYearTypeStart}
                  label="year-type-start"
                  defaultValue="??????"
                  sx={{ m: 1 }}
                >
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="?????????">?????????</MenuItem>
                  <MenuItem value="?????????">?????????</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="?????????">?????????</MenuItem>
                  <MenuItem value="?????????">?????????</MenuItem>
                </Select>
                <TextField
                  id="standard-basic"
                  label="??????????????????"
                  variant="standard"
                  type="number"
                  value={yearStart}
                  onChange={handleChangeYearStart}
                  sx={{ m: 1 }}
                  disabled={yearStartDisabled}
                />
                <span style={{ margin: 'auto 0' }}>???</span>
                <Select
                  labelId="year-type-end-label"
                  id="year-type-end"
                  value={yearTypeEnd}
                  onChange={handleChangeYearTypeEnd}
                  label="year-type-end"
                  defaultValue="??????"
                  sx={{ m: 1 }}
                >
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="?????????">?????????</MenuItem>
                  <MenuItem value="?????????">?????????</MenuItem>
                  <MenuItem value="??????">??????</MenuItem>
                  <MenuItem value="?????????">?????????</MenuItem>
                  <MenuItem value="?????????">?????????</MenuItem>
                </Select>
                <TextField
                  id="standard-basic"
                  label="??????????????????"
                  variant="standard"
                  type="number"
                  value={yearEnd}
                  onChange={handleChangeYearEnd}
                  sx={{ m: 1 }}
                  disabled={yearEndDisabled}
                />
              </FormControl>
            </Box>
            <br />
            <Button
              onClick={() => handleFilterContents()}
              variant="contained"
              color="primary"
            >
              ??????
            </Button>
          </FormControl>
        </MenuItem>
        <MenuItem></MenuItem>
      </Menu>

      <Dialog
        open={openEditMylistName}
        onClose={handleCloseEditMylistName}
        aria-labelledby="form-edit-name-dialog-title"
      >
        <DialogTitle id="form-edit-name-dialog-title">
          ???????????????????????????
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            defaultValue={mylistContentsState.name}
            onChange={handleNewMylistName}
          />
          <DialogActions>
            <Button
              onClick={handleCloseEditMylistName}
              color="primary"
              style={{ position: 'absolute', left: '20px' }}
            >
              ???????????????
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => handlePutMylists()}
            >
              ??????
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        aria-labelledby="form-delete-dialog-title"
      >
        <DialogTitle id="form-delete-dialog-title">
          ???????????????????????????????????????
        </DialogTitle>
        <DialogContent>
          <DialogActions>
            <Typography>
              <Button
                onClick={handleCloseDeleteConfirm}
                color="primary"
                style={{ position: 'absolute', left: '20px' }}
              >
                ???????????????
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={handleDeleteMylist}
              >
                ??????
              </Button>
            </Typography>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {filterOn ? (
        <div>
          {filterStar.noStar ? <span></span> : <span></span>}
          {yearTypeStart}
          {yearStart}???{yearTypeEnd}
          {yearEnd}
          <Button onClick={() => handelClearFilter()}>?????????</Button>
        </div>
      ) : (
        <span></span>
      )}
      {mylistItems?.items?.map((item, index) => (
        <MylistContentsWrapper key={index} item={item} />
      ))}
    </>
  )
}
