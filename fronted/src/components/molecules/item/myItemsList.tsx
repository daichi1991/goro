import { Backdrop, Fade, makeStyles, Modal } from '@material-ui/core';
import * as React from 'react';
import { getItems, getMyItems } from '../../../apis/item';
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


export const MyItemsList:React.FC = () =>{
    
    const {myItemsState, setMyItems} = useContext(MyItemsContext);
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpenForm = () =>{
        setOpen(true);
    };

    const handleClose = () =>{
        setOpen(false);
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
                                <input type="text" name="title"/>
                            </label>

                            <label>
                                年代タイプ:
                                <input type="text" name="year_type"/>
                            </label>

                            <label>
                                年:
                                <input type="text" name="year"/>
                            </label>

                            <label>
                                できごとの説明:
                                <input type="textarea" name="description"/>
                            </label>

                            <input type="submit" value="Submit">作成</input>
                        </form>
                    </div>
                </Fade>
            </Modal>
            <h3>アイテムリスト</h3>
            {myItemsState.map((myItem,index) =>
                <ItemsWrapper key={index} item={myItem} />
                
            )}
        </>
    )
}