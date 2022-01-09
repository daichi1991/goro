import PropTypes from 'prop-types'
import * as React from 'react'
import { getItems } from '../apis/item'
import { ItemType } from '../components/molecules/types'

const { useEffect, useState } = React

export const ItemsContext = React.createContext(
  {} as {
    itemsState: ItemType[]
    setItems: React.Dispatch<React.SetStateAction<ItemType[]>>
  },
)

export const MyItemsContext = React.createContext(
  {} as {
    myItemsState: ItemType[]
    setMyItems: React.Dispatch<React.SetStateAction<ItemType[]>>
  },
)

const ItemsProvider: React.FC = (children) => {
  const [itemsState, setItems] = useState<ItemType[]>([])
  const [myItemsState, setMyItems] = useState<ItemType[]>([])

  useEffect(() => {
    getItems().then((data: React.SetStateAction<ItemType[]>) => {
      setItems(data)
    })
  }, [])

  return (
    <ItemsContext.Provider value={{ itemsState, setItems }}>
      <MyItemsContext.Provider value={{ myItemsState, setMyItems }}>
        {children.children}
      </MyItemsContext.Provider>
    </ItemsContext.Provider>
  )
}

ItemsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  type: PropTypes.string,
}

export default ItemsProvider
