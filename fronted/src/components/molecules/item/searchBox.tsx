import { createStyles, IconButton, InputBase, makeStyles, Paper, Theme } from '@material-ui/core';
import * as React from 'react';
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { ItemsContext } from '../../../contexts/itemsContexts';
import { searchItems } from '../../../apis/item';
import { ItemType } from '../types';

const {useContext, useState} = React;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
    }),
);

export const SearchBox = () =>{
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

    return(
        <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} area-label="menu">
                <MenuIcon />
            </IconButton>
            <InputBase 
                className={classes.input}
                placeholder="キーワード"
                inputProps={{'aaa':'iii'}}
                value={keyword}
                onChange={handleKeyword}
            />
            <IconButton className={classes.iconButton} area-label="search">
                <SearchIcon onClick={handleSearch}/>
            </IconButton>
        </Paper>
    )
}