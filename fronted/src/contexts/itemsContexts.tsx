import * as React from 'react';
import {ItemType} from '../components/molecules/types'

const {useEffect} = React;

export const ItemsContext = React.createContext({} as {
    itemsState:ItemType[],
    setItems:React.Dispatch<React.SetStateAction<ItemType[]>>
});

export const ItemsProvider = ItemsContext.Provider;