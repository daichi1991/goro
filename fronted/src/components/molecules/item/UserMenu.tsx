import { Backdrop, Fade, makeStyles, Modal } from '@material-ui/core';
import * as React from 'react';
import { getItems, getMyItems, postItems } from '../../../apis/item';
import { MyItemsContext } from '../../../contexts/itemsContexts';
import { ItemType } from '../types';
import { ItemsWrapper } from './itemsWrapper';

const {useContext, useEffect, useState} = React;

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export const UserMenu:React.FC = () =>{
    
    const {myItemsState, setMyItems} = useContext(MyItemsContext);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    
    const [itemTitle, setItemTitle] = useState("");
    const [itemYear, setItemYear] = useState<number>(0);
    const [itemYearType, setItemYearType] = useState("");
    const [itemGoroText, setItemGoroText] = useState("");
    const [itemDescription, setItemDescription] = useState("");


    const handleOpenForm = () =>{
        setOpen(true);
    };

    const handleClose = () =>{
        setOpen(false);
    };

    const handleItemTitle = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setItemTitle(event.target.value);
    };

    const handleItemYearType = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setItemYearType(event.target.value);
    };

    const handleItemYear = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setItemYear(parseInt(event.target.value));
    };

    const handleItemGoroText = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setItemGoroText(event.target.value);
    };

    const handleItemDescription = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setItemDescription(event.target.value);
    };

    const handleAddItem = () =>{
        postItems(itemTitle, itemYear, itemYearType, itemGoroText, itemDescription)
    };

    useEffect(() =>{
        getMyItems()
        .then((data: React.SetStateAction<ItemType[]>) =>{
            setMyItems(data);
        })
    },[])

    return(
        <>
            <button type="button" onClick={handleOpenForm}>
                語呂合わせ作成
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <p id="transition-modal-title">語呂合わせ新規作成</p>
                        <form>
                            <label>
                                できごと:
                                <input 
                                    type="text"
                                    value={itemTitle}
                                    onChange={handleItemTitle}
                                />
                            </label><br/>

                            <label>
                                年:
                                <input
                                    type="text"
                                    value={itemYear}
                                    onChange={handleItemYear}
                                    />
                            </label><br/>

                            <label>
                                年代タイプ:
                                <input 
                                    type="text"
                                    value={itemYearType}
                                    onChange={handleItemYearType}
                                />
                            </label><br/>

                            <label>
                                語呂:
                                <input
                                    type="text"
                                    value={itemGoroText}
                                    onChange={handleItemGoroText}
                                />
                            </label><br/>

                            <label>
                                説明:
                                <input
                                    type="textarea"
                                    value={itemDescription}
                                    onChange={handleItemDescription}
                                />
                            </label><br/>

                            <button onClick={() => handleAddItem()}>作成</button>
                        </form>
                    </div>
                </Fade>
            </Modal>
                <h3>アイテムリスト</h3>
                {myItemsState.map((myItem,index) =>
                    <ItemsWrapper key={index} item={myItem} />
                )}
                :<h3>アイテムリスト</h3>

        </>
    )
}