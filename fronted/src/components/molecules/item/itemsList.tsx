import * as React from 'react';
import { ItemsContext } from '../../../contexts/itemsContexts';
import { ItemsWrapper } from './itemsWrapper';

const {useContext} = React;

export const ItemsList:React.FC = () =>{
    
    const {itemsState, setItems} = useContext(ItemsContext);

    return(
        <>
            <h3>アイテムリスト</h3>
            {itemsState.map((item,index) =>
                <ItemsWrapper key={index} item={item} />
                
            )}
        </>
    )
}