import * as React from 'react'
import { MylistsContext } from '../../../contexts/mylistContexts';
import { MylistContentsType, MylistItemType, MylistType } from '../types'
import {useParams} from 'react-router-dom'
import { deleteItemMylist, getItemMylistShow } from '../../../apis/itemMylist';
import { MylistContentsWrapper } from './mylistContensWrapper';
import { MylistContentsContext } from '../../../contexts/mylistContensContexts';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Button } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { deleteMylist } from '../../../apis/mylist';
import * as H from 'history';
import { Link } from 'react-router-dom';
import { useStyles } from '../../../utils/style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {Dialog} from '@material-ui/core';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@mui/material/TextField';

import {usePutMylist} from '../../../contexts/mylistContexts'

const {useEffect, useState} = React;

interface Props {
    history: H.History
}

interface ParamTypes {
    mylistId: string
}

export const MylistContents:React.FC<Props> = (props:Props)=> {

    const {mylistId} = useParams<ParamTypes>();
    const {mylistContentsState, setMylistContents} = React.useContext(MylistContentsContext);
    const {mylistsState, setMylists} = React.useContext(MylistsContext);
    const [displayOrder, setDisplayOrder] = useState<string>('mylistId');
    const [openEditMylistName, setOpenEditMylistName] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [newMylistName, setNewMylistName] = useState<string>(MylistContents.name)
    const putMylist = usePutMylist(mylistContentsState.id, newMylistName)
    const classes = useStyles();

    useEffect(() => {
        getItemMylistShow(mylistId)
        .then((data) =>{
            setMylistContents(data);
        })
    }, [])

    const handlePutMylists = async() =>{
        const newMylists = mylistContentsState;
        newMylists.name = newMylistName;
        await putMylist(mylistContentsState.id, newMylistName);
        setMylistContents(newMylists);
        setOpenEditMylistName(false);
    }

    const handleDeleteMylist = () =>{
        const newMylists = [...mylistsState]
        const targetIndex:number = newMylists.findIndex(({id}) => id ===mylistId);
        newMylists.splice(targetIndex,1);
        
        deleteMylist(mylistId);
        setMylists(newMylists);
        props.history.replace(
            {pathname: "/mylists",
            state: { mylistLocationState: mylistContentsState.name}
            }
        )
    }

    const handleChangeDisplayOrder = (event: SelectChangeEvent) =>{
        const changeValue = event.target.value;
        setDisplayOrder(changeValue);

        const mylistContentItems = mylistContentsState.items?[...mylistContentsState.items]:undefined;
        const newMylistContent:MylistContentsType ={
            id:mylistContentsState.id,
            name:mylistContentsState.name,
            items:mylistContentItems,
        }
        if(mylistContentItems){
            if(changeValue === 'mylistId'){
                const orderByMylistId = mylistContentItems.sort((a,b) => {
                    return(a.item_mylist_id < b.item_mylist_id)? -1 :1;
                });
                newMylistContent.items = orderByMylistId;
            }else if (changeValue === 'yearAsc'){
                const orderByYear = mylistContentItems.sort((a,b) => {
                    return(a.year_for_sort < b.year_for_sort)? -1 :1;
                });
                newMylistContent.items = orderByYear;
            }else if (changeValue === 'yearDesc'){
                const orderByYear = mylistContentItems.sort((a,b) => {
                    return(a.year_for_sort < b.year_for_sort)? 1 :-1;
                });
                newMylistContent.items = orderByYear;
            }else if (changeValue === 'title'){
                const orderByTitle = mylistContentItems.sort((a,b) => {
                    return(a.title < b.title)? -1 :1;
                });
                newMylistContent.items = orderByTitle;
            }
        }
        setMylistContents(newMylistContent);
    }

    const handelSortByYear = () =>{
        const mylistContentItems = mylistContentsState.items?[...mylistContentsState.items]:undefined;
        const newMylistContent:MylistContentsType ={
            id:mylistContentsState.id,
            name:mylistContentsState.name,
            items:mylistContentItems,
        }
        if(mylistContentItems){
            const result = mylistContentItems.sort((a,b) => {
                return(a.year_for_sort < b.year_for_sort)? -1 :1;
            });
            newMylistContent.items = result;
        }
        setMylistContents(newMylistContent);
    }

    const handleOpenEditMylistName = () =>{
        setOpenEditMylistName(true);
    };

    const handleCloseEditMylistName = () =>{
        setOpenEditMylistName(false);
    };

    const handleOpenDeleteConfirm = () =>{
        setOpenDeleteConfirm(true);
    };

    const handleCloseDeleteConfirm = () =>{
        setOpenDeleteConfirm(false);
    };

    const handleNewMylistName = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setNewMylistName(event.target.value);
    }

    return(
        <>
            <Link to="/mylists" className={classes.itemLinkIcon}>
                <ArrowBackIcon/>
            </Link>
            <Typography variant="h4" component="span">{mylistContentsState.name}</Typography>
            <PopupState variant="popover" popupId="menu-popup-popover">
                {(popupState: any) => (
                    <div>
                        <Button variant="text"{...bindTrigger(popupState)} className={classes.mylistMenubtn} style={{position:"absolute"}}>
                            <MoreHorizIcon/>
                        </Button>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                            }}
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                            }}
                        >
                            <Box p={2}>
                                <Typography>
                                    <div onClick={handleOpenEditMylistName}>
                                        マイリスト名を変更
                                    </div>
                                    <div onClick={handleOpenDeleteConfirm}>
                                        削除
                                    </div>
                                </Typography>
                            </Box>
                        </Popover>
                    </div>
                    )}
            </PopupState>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={displayOrder}
                    onChange={handleChangeDisplayOrder}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={'mylistId'}>マイリスト追加順</MenuItem>
                    <MenuItem value={'yearAsc'}>年代昇順</MenuItem>
                    <MenuItem value={'yearDesc'}>年代降順</MenuItem>
                    <MenuItem value={'title'}>タイトル順</MenuItem>
                </Select>
            </FormControl>
            <Dialog
                open={openEditMylistName}
                onClose={handleCloseEditMylistName}
                aria-labelledby="form-edit-name-dialog-title"
            >
                <DialogTitle id="form-edit-name-dialog-title">マイリスト名を変更</DialogTitle>
                <DialogContent>
                    <TextField id="outlined-basic" defaultValue={mylistContentsState.name} onChange={handleNewMylistName}/>
                    <DialogActions>
                        <Button onClick={handleCloseEditMylistName} color="primary">
                            キャンセル
                        </Button>
                        <Button color="primary" variant="contained" onClick={() => handlePutMylists()}>
                            完了
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Dialog
                open={openDeleteConfirm}
                onClose={handleCloseDeleteConfirm}
                aria-labelledby="form-delete-dialog-title"
            >
                <DialogTitle id="form-delete-dialog-title">マイリストを削除しますか？</DialogTitle>
                <DialogContent>
                    <DialogActions>
                    <Typography>
                        <Button onClick={handleCloseDeleteConfirm} color="primary">
                            キャンセル
                        </Button>
                        <Button color="primary" variant="contained" onClick={handleDeleteMylist}>
                            完了
                        </Button>
                    </Typography>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            {mylistContentsState?.items?.map((item, index) =>
                <MylistContentsWrapper key={index} item={item} />
            )}
        </>
    )
}