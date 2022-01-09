import React, { FC, useContext } from 'react'
import { ItemsContext } from '../../../contexts/itemsContexts'
import { useStyles } from '../../../utils/style'
import { ItemsWrapper } from './itemsWrapper'
import { SearchBox } from './searchBox'

export const ItemsList: FC = () => {
  const classes = useStyles()
  const { itemsState } = useContext(ItemsContext)

  return (
    <>
      <div className={classes.itemList}>
        <SearchBox />

        <h3>アイテムリスト</h3>
        {Object.keys(itemsState).length != 0 ? (
          <span>
            {itemsState.map((item, index) => (
              <ItemsWrapper key={index} item={item} />
            ))}
          </span>
        ) : (
          <span></span>
        )}
      </div>
    </>
  )
}
