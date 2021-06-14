import { Backdrop, Fade, makeStyles, Modal } from '@material-ui/core';
import * as React from 'react';
import { postMylists } from '../../../apis/mylist';
import { MylistsContext } from '../../../contexts/mylistContexts';
import { MylistWrapper } from './mylistWrapper';

const {useContext, useState} = React;

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

export const Mylists:React.FC = () =>{
    
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const {mylistsState, setMylists} = useContext(MylistsContext);

    const [mylistName, setMylistName] = useState("");

    const handleOpenForm = () =>{
        setOpen(true);
    };

    const handleClose = () =>{
        setOpen(false);
    };

    const handleMylistName = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setMylistName(event.target.value);
    };

    const handleAddMylist = () =>{
        postMylists(mylistName)
    };


    return(
        <>
            <h3>マイリスト</h3>
            {mylistsState.map((mylist, index) => 
                <MylistWrapper key={index} mylist={mylist} />
            )}
            <button type="button" onClick={handleOpenForm}>
                マイリスト作成
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
                        <p id="transition-modal-title">マイリスト新規作成</p>
                        <form>
                            <label>
                                マイリスト名
                                <input 
                                    type="text"
                                    value={mylistName}
                                    onChange={handleMylistName}
                                />
                            </label><br/>

                            <button onClick={() => handleAddMylist()}>作成</button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}