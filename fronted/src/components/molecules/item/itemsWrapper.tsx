import * as React from 'react';
import { ItemType } from '../types';
import { Backdrop, Fade, makeStyles, Modal } from '@material-ui/core';
import { MylistsContext } from '../../../contexts/mylistContexts';
import { MylistModal } from './mylistModal';

const {useState, useContext} = React;

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

interface Props{
    item:ItemType;
}

export const ItemsWrapper:React.FC<Props> = (props:Props) =>{

    const [open, setOpen] = useState(false);
    const {mylistsState, setMylists} = useContext(MylistsContext);

    const classes = useStyles();

    const item = props.item;

    const handleOpenForm = () =>{
        setOpen(true);
    };

    const handleClose = () =>{
        setOpen(false);
    };

    return(
        <>
            {item.title}
            <button type="button" onClick={handleOpenForm}>
                マイリストに追加
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
                        <p id="transition-modal-title">マイリストに追加</p>
                        {mylistsState.map((mylist, index) =>
                            <MylistModal key={index} mylist={mylist} item={item}/>
                        )}
                    </div>
                </Fade>
            </Modal>
        </>
    )
}