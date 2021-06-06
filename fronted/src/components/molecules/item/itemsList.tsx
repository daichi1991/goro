import { Backdrop, Fade, makeStyles, Modal } from '@material-ui/core';
import * as React from 'react';
import { searchItems } from '../../../apis/item';
import { ItemsContext } from '../../../contexts/itemsContexts';
import { ItemType } from '../types';
import { ItemsWrapper } from './itemsWrapper';

const {useContext, useState} = React;


export const ItemsList:React.FC = () =>{
    
    const {itemsState, setItems} = useContext(ItemsContext);
    const [keyword, setKeyword] = useState("");

    const handleKeyword = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setKeyword(e.target.value);
    };

    const handleSearch = () =>{
        searchItems(keyword)
        .then((data: React.SetStateAction<ItemType[]>) =>{
            setItems(data);
        })
    }


    return(
        <>
            <p>検索</p>
            <input type="text" onChange={e => handleKeyword(e)} value={keyword}/>
            <button onClick={handleSearch}>検索</button>

            <h3>アイテムリスト</h3>
            {itemsState.map((item,index) =>
                <ItemsWrapper key={index} item={item} />
                
            )}
        </>
    )
}