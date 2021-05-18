import * as React from 'react';
import { ItemsList } from '../components/molecules/item/itemsList';
import {ItemType} from '../components/molecules/types'
import {getItems} from '../apis/item'

const {useEffect, useState} = React;

export const ItemsContext = React.createContext({} as {
    itemsState:ItemType[],
    setItems:React.Dispatch<React.SetStateAction<ItemType[]>>
});



const ItemsProvider:React.FC = () => {

    const [itemsState, setItems] = useState<ItemType[]>([]);

    useEffect(() =>{
        getItems()
        .then((data) =>{
            setItems(data);
        })
    },[])

    return(
        <ItemsContext.Provider value={{itemsState, setItems}}>
            <ItemsList />
        </ItemsContext.Provider>
    )
}


export default ItemsProvider