import {
  createStyles,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import * as React from 'react'
import { searchItems } from '../../../apis/item'
import { ItemsContext } from '../../../contexts/itemsContexts'
import { ItemType } from '../types'

const { useContext, useState } = React

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      minWidth: 300,
    },
    input: {
      padding: '2px 10px',
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }),
)

export const SearchBox = () => {
  const classes = useStyles()

  const { setItems } = useContext(ItemsContext)
  const [keyword, setKeyword] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showKeyword, setShowKeyword] = useState('')

  const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleSearch = () => {
    searchItems(keyword).then((data: React.SetStateAction<ItemType[]>) => {
      setItems(data)
    })
    setShowKeyword(keyword)
  }

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="キーワード"
        inputProps={{ aaa: 'iii' }}
        value={keyword}
        onChange={handleKeyword}
      />
      <IconButton className={classes.iconButton} area-label="search">
        <SearchIcon onClick={handleSearch} />
      </IconButton>
    </Paper>
  )
}
