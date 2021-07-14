import * as React from 'react';
import useMedia from "use-media";
import { ItemType } from '../types';
import { AppBar, Backdrop, Button, createStyles, Dialog, Fade, IconButton, makeStyles, Modal, Paper, Theme, Toolbar } from '@material-ui/core';
import { MylistsContext } from '../../../contexts/mylistContexts';
import { MylistModal } from './mylistModal';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const {useState, useContext} = React;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
        position: "relative"
        },
        title: {
        marginLeft: theme.spacing(2),
        flex: 1
        }
    })
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

interface Props{
    item:ItemType;
}

export const ItemsWrapper:React.FC<Props> = (props:Props) =>{

    const isWide = useMedia({ minWidth: "750px" });

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
            <Paper variant="outlined">
                {item.title}
                <Button onClick={handleOpenForm}>
                    <LibraryAddIcon/>
                </Button>
                {isWide? (
                    <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">マイリストに追加</DialogTitle>
                        <DialogContent>
                            {mylistsState.length?(
                                mylistsState.map((mylist, index) =>
                                    <MylistModal key={index} mylist={mylist} item={item}/>
                                )
                            ):(<></>)  
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                キャンセル
                            </Button>
                        </DialogActions>
                    </Dialog>
                    ) : (
                    <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                        >
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                マイリストに追加
                            </Typography>
                            </Toolbar>
                        </AppBar>
                        <DialogContent>
                            {mylistsState.length?(
                                mylistsState.map((mylist, index) =>
                                    <MylistModal key={index} mylist={mylist} item={item}/>
                                )
                            ):(<></>)  
                            }
                        </DialogContent>
                    </Dialog>
                    )
                }


            </Paper>
        </>
    )
}