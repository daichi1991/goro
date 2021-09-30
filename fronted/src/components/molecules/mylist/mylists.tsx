import { Backdrop, Fade, makeStyles, Modal } from '@material-ui/core';
import * as React from 'react';
import { postMylists } from '../../../apis/mylist';
import { MylistsContext } from '../../../contexts/mylistContexts';
import { MylistWrapper } from './mylistWrapper';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { RouteComponentProps } from "react-router-dom";
import Button from "@material-ui/core/Button";

const {useContext, useState} = React;

function Alert(props: JSX.IntrinsicAttributes & AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

interface MylistLocationState {
    mylistLocationState: string;
}

export const Mylists = (props: RouteComponentProps<{}, any, MylistLocationState | any>) =>{    
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const {mylistsState, setMylists} = useContext(MylistsContext);

    const [mylistName, setMylistName] = useState("");

    const [openSnackbar, setOpenSnackbar] = useState(true);

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

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };


    return(
        <>
            <h3>マイリスト</h3>
            <Button variant="outlined" color="primary" onClick={handleOpenForm}>
                マイリスト作成
            </Button>
            {mylistsState.length?
            <div>
                {mylistsState?.map((mylist, index) => 
                    <MylistWrapper key={index} mylist={mylist} />
                )}
            </div>:
            <span></span>
            }
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

            {props.location.state?
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success">
                    {props.location.state.mylistLocationState}を削除しました。
                    </Alert>
                </Snackbar>:
                <span></span>
            }

        </>
    )
}