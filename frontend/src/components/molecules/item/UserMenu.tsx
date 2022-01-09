import * as React from 'react';
import { getItems, getMyItems, postItems } from '../../../apis/item';
import { MyItemsContext } from '../../../contexts/itemsContexts';
import { ItemType } from '../types';
import { ItemsWrapper } from './itemsWrapper';
import useMedia from "use-media";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { InputLabel, MenuItem, Select } from '@material-ui/core';


const {useContext, useEffect, useState} = React;

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

export const UserMenu:React.FC = () =>{
    const classes = useStyles();
    const isWide = useMedia({ minWidth: "750px" });
    
    const {myItemsState, setMyItems} = useContext(MyItemsContext);
    
    const [open, setOpen] = useState(false);
    
    const [itemTitle, setItemTitle] = useState("");
    const [itemYear, setItemYear] = useState("");
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
        setItemYear(event.target.value);
    };

    const handleItemGoroText = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setItemGoroText(event.target.value);
    };

    const handleItemDescription = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setItemDescription(event.target.value);
    };

    const handleClearState = () =>{
        setItemTitle("");
        setItemYear("");
        setItemYearType("");
        setItemGoroText("");
        setItemDescription("");
    };

    const handleMyItems = () =>{
        const randomId = Math.random().toString(36).slice(-8);
        const newItem:ItemType = {
            id:randomId,
            user_id:"",
            title:itemTitle,
            year:itemYear,
            year_for_sort:0,
            year_type:itemYearType,
            goro_text:itemGoroText,
            description:itemDescription
        }
        const newMyItems:ItemType[] = myItemsState.length===0?[...myItemsState, newItem]:[newItem];
        setMyItems(newMyItems);

    }

    const handleAddItem = () =>{
        postItems(itemTitle, itemYear, itemYearType, itemGoroText, itemDescription)
        .then(() =>{
            handleMyItems();
            handleClearState();
            setOpen(false);        
        }
        )
        
    };

    useEffect(() =>{
        getMyItems()
        .then((data: React.SetStateAction<ItemType[]>) =>{
            setMyItems(data);
        })
    },[])

    return(
        <>
            <Button variant="outlined" color="primary" onClick={handleOpenForm}>
                語呂合わせ作成
            </Button>
            {isWide ? (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">語呂合わせ新規作成</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={itemTitle}
                        margin="dense"
                        id="title-text-field"
                        label="できごと"
                        type="text"
                        fullWidth
                        onChange={handleItemTitle}
                    />
                    <TextField
                        value={itemYear}
                        margin="dense"
                        id="year-text-field"
                        label="年"
                        type="text"
                        fullWidth
                        onChange={handleItemYear}
                    />
                    <TextField
                        id="year-type-select"
                        margin="dense"
                        select
                        label="年代タイプ"
                        fullWidth
                        onChange={handleItemYearType}
                    >
                        <MenuItem selected value="紀元後">
                            紀元後
                        </MenuItem>
                        <MenuItem value="紀元前">
                            紀元前
                        </MenuItem>
                        <MenuItem value="年前">
                            年前
                        </MenuItem>
                        <MenuItem value="万年前">
                            万年前
                        </MenuItem>
                        <MenuItem value="億年前">
                            億年前
                        </MenuItem>
                    </TextField>
                    <TextField
                        value={itemGoroText}
                        margin="dense"
                        id="goro-text-field"
                        label="語呂"
                        type="text"
                        fullWidth
                        onChange={handleItemGoroText}
                    />
                    <TextField
                        id="description-text-field"
                        label="説明"
                        margin="dense"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        onChange={handleItemDescription}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" style={{position:"absolute",left:"20px"}}>
                        キャンセル
                    </Button>
                    <Button color="primary" variant="contained" onClick={() =>handleAddItem()}>
                        作成
                    </Button>
                </DialogActions>
            </Dialog>
            ):
            (
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
                            新規語呂作成
                        </Typography>
                        <Button autoFocus color="inherit" onClick={() =>handleAddItem()}>
                            作成
                        </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <TextField
                            autoFocus
                            value={itemTitle}
                            margin="dense"
                            id="title-text-field"
                            label="できごと"
                            type="text"
                            fullWidth
                            onChange={handleItemTitle}
                        />
                        <TextField
                            value={itemYear}
                            margin="dense"
                            id="year-text-field"
                            label="年"
                            type="text"
                            fullWidth
                            onChange={handleItemYear}
                        />
                        <TextField
                            id="year-type-select"
                            margin="dense"
                            select
                            label="年代タイプ"
                            fullWidth
                            onChange={handleItemYearType}
                        >
                            <MenuItem selected value="紀元後">
                                紀元後
                            </MenuItem>
                            <MenuItem value="紀元前">
                                紀元前
                            </MenuItem>
                            <MenuItem value="年前">
                                年前
                            </MenuItem>
                            <MenuItem value="万年前">
                                万年前
                            </MenuItem>
                            <MenuItem value="億年前">
                                億年前
                            </MenuItem>
                        </TextField>
                        <TextField
                            value={itemGoroText}
                            margin="dense"
                            id="goro-text-field"
                            label="語呂"
                            type="text"
                            fullWidth
                            onChange={handleItemGoroText}
                        />
                        <TextField
                            id="description-text-field"
                            label="説明"
                            margin="dense"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            onChange={handleItemDescription}
                        />
                    </DialogContent>
                </Dialog>
            )
            }
                <h3>アイテムリスト</h3>
                {
                    Object.keys(myItemsState).length != 0?
                    <span>
                        {myItemsState.map((myItem,index) =>
                            <ItemsWrapper key={index} item={myItem} />
                        )}
                    </span>
                    :
                    <span></span>
                }
        </>
    )
}