import { Backdrop, Fade, makeStyles, Modal } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import * as React from 'react';
import { getItems, searchItems } from '../../../apis/item';
import { ItemsContext } from '../../../contexts/itemsContexts';
import { ItemType } from '../types';
import { ItemsWrapper } from './itemsWrapper';
import {SearchBox} from './searchBox';
import {useStyles} from '../../../utils/style';

const {useContext, useState} = React;


export const ItemsList:React.FC = () =>{
    const classes = useStyles();
    const {itemsState, setItems} = useContext(ItemsContext);
    const [keyword, setKeyword] = useState("");
    const [showKeyword, setShowKeyword] = useState("");

    const handleKeyword = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setKeyword(e.target.value);
    };

    const handleSearch = () =>{
        searchItems(keyword)
        .then((data: React.SetStateAction<ItemType[]>) =>{
            setItems(data);
        })
        setShowKeyword(keyword)
    };

    const handleClearSearch = () =>{
        getItems()
        .then((data: React.SetStateAction<ItemType[]>) =>{
            setItems(data);
        })
        setShowKeyword("");
    };


    return(
        <>
            <div className={classes.itemList}>
                <SearchBox />

                <h3>アイテムリスト</h3>
                {
                    Object.keys(itemsState).length != 0?
                        <span>
                            {itemsState.map((item,index) =>
                            <ItemsWrapper key={index} item={item} />
                            )}
                        </span>  
                    :
                    <span></span>
                }
            </div>
        </>
    )
}