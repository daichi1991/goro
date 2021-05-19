import * as React from 'react';
import PropTypes from 'prop-types';
import { ItemsList } from '../components/molecules/item/itemsList';
import {ItemType} from '../components/molecules/types'
import {getItems} from '../apis/item'

const {useEffect, useState} = React;

export const ItemsContext = React.createContext({} as {
    itemsState:ItemType[],
    setItems:React.Dispatch<React.SetStateAction<ItemType[]>>
});

export const UserItemsContext = React.createContext({} as {
    userItemsState:ItemType[],
    setUserItems:React.Dispatch<React.SetStateAction<ItemType[]>>
});



const ItemsProvider:React.FC = (children) => {

    const [itemsState, setItems] = useState<ItemType[]>([]);
    const [userItemsState, setUserItems] = useState<ItemType[]>([]);

    useEffect(() =>{
        getItems()
        .then((data: React.SetStateAction<ItemType[]>) =>{
            setItems(data);
        })
    },[])

    return(
        <ItemsContext.Provider value={{itemsState, setItems}}>
            <UserItemsContext.Provider value={{userItemsState, setUserItems}}>
                {children}
            </UserItemsContext.Provider>
        </ItemsContext.Provider>
    )
}

ItemsProvider.propTypes = {
    children:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]).isRequired,
    type: PropTypes.string,
}

export default ItemsProvider