import * as React from 'react';
import { getItems, getMyItems } from '../../../apis/item';
import { MyItemsContext } from '../../../contexts/itemsContexts';
import { ItemType } from '../types';
import { ItemsWrapper } from './itemsWrapper';

const {useContext, useEffect} = React;

export const MyItemsList:React.FC = () =>{
    
    const {myItemsState, setMyItems} = useContext(MyItemsContext);

    useEffect(() =>{
        getMyItems()
        .then((data: React.SetStateAction<ItemType[]>) =>{
            setMyItems(data);
        })
    },[])

    return(
        <>
            <h3>アイテムリスト</h3>
            {myItemsState.map((myItem,index) =>
                <ItemsWrapper key={index} item={myItem} />
                
            )}
        </>
    )
}