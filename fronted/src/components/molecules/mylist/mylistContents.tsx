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
import { constants } from 'os';

import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Star, StarBorder, StarHalf, FilterList } from '@material-ui/icons';

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
    const [filterBy, setFilterBy] = useState<string>('');
    const [openEditMylistName, setOpenEditMylistName] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [newMylistName, setNewMylistName] = useState<string>(MylistContents.name)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [filterStar, setFilterStar] = useState({
        noStar: false,
        halfStar: false,
        fullStar: false
    })
    const open = Boolean(anchorEl);
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

    const handleFilterContents = (yearStart:number, yearTypeStart:string, yearEnd:number, yearTypeEnd:string) => {
        const mylistContentItems = mylistContentsState.items?[...mylistContentsState.items]:undefined;

        let arrayFilterBy = mylistContentItems

        if(arrayFilterBy){
            arrayFilterBy = filterByMemory(arrayFilterBy)
            console.log(arrayFilterBy)
    
            if(yearStart != 0 && yearTypeStart){
                const d = new Date();
                const nowYear = d.getFullYear();
                let yearForSort = 0;

                switch(yearTypeStart){
                    case "紀元後":
                        yearForSort = yearStart;
                        break;
                    case "紀元前":
                        yearForSort = 0 - yearStart;
                        break;
                    case "年前":
                        yearForSort = nowYear - yearStart;
                        break;
                    case "万年前":
                        yearForSort = nowYear - yearStart * 10000;
                        break;
                    case "億年前":
                        yearForSort = nowYear - yearStart * 100000000;
                        break;
                }
                arrayFilterBy = filterByYearStart(arrayFilterBy, yearForSort)
            }

            if(yearEnd != 0 && yearTypeEnd){
                const d = new Date();
                const nowYear = d.getFullYear();
                let yearForSort = 0;

                switch(yearTypeStart){
                    case "紀元後":
                        yearForSort = yearStart;
                        break;
                    case "紀元前":
                        yearForSort = 0 - yearStart;
                        break;
                    case "年前":
                        yearForSort = nowYear - yearStart;
                        break;
                    case "万年前":
                        yearForSort = nowYear - yearStart * 10000;
                        break;
                    case "億年前":
                        yearForSort = nowYear - yearStart * 100000000;
                        break;
                }
                arrayFilterBy = filterByYearStart(arrayFilterBy, yearForSort)
            }
        }

        const newMylistContent:MylistContentsType ={
            id:mylistContentsState.id,
            name:mylistContentsState.name,
            items:arrayFilterBy,
        }
        console.log(newMylistContent)
        setMylistContents(newMylistContent);

    }

    const filterByMemory = (inputArray:MylistItemType[]) =>{
        const starArray: number[] = [];
        if(filterStar.noStar){
            starArray.push(0)
        }
        if(filterStar.halfStar){
            starArray.push(1)
        }
        if(filterStar.fullStar){
            starArray.push(2)
        }

        const tmpArray = [...inputArray]

        const outputArray = tmpArray.filter(function(tmp){
            return starArray.includes(tmp.memory_level)
        })

        return outputArray
    }

    const filterByYearStart = (inputArray:MylistItemType[], year:number) =>{
        const tmpArray =[...inputArray]

        const outputArray = tmpArray.filter(function(tmp){
            return tmp.year_for_sort >= year;
        })

        return outputArray
    }

    const filterByYearEnd = (inputArray:MylistItemType[], year:number) =>{
        const tmpArray =[...inputArray]

        const outputArray = tmpArray.filter(function(tmp){
            return tmp.year_for_sort <= year;
        })

        return outputArray
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

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeStar = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setFilterStar({
            ...filterStar,
            [event.target.name]: event.target.checked
        })
    }

    const {noStar, halfStar, fullStar} = filterStar;

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

            <Button
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <FilterList/>
            </Button>

            <Menu
                id="filter-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                >
                <MenuItem>
                    <FormControl component="fieldset">
                        <Box>
                            <FormLabel component="legend">記憶度</FormLabel>
                                <FormControlLabel control={
                                    <Checkbox checked={noStar} onChange={handleChangeStar} name="noStar" />
                                    }
                                    label={<StarBorder />}
                                />
                                <FormControlLabel control={
                                    <Checkbox checked={halfStar} onChange={handleChangeStar} name="halfStar" />
                                    }
                                    label={<StarHalf />}
                                />
                                <FormControlLabel control={
                                    <Checkbox checked={fullStar} onChange={handleChangeStar} name="fullStar" />
                                    }
                                    label={<Star />}
                                />
                        </Box>
                        <Button onClick={() => handleFilterContents(2000,"紀元前", 2000, "紀元後")}>
                            検索
                        </Button>
                    </FormControl>
                </MenuItem>
                <MenuItem>
                </MenuItem>
            </Menu>

            <Dialog
                open={openEditMylistName}
                onClose={handleCloseEditMylistName}
                aria-labelledby="form-edit-name-dialog-title"
            >
                <DialogTitle id="form-edit-name-dialog-title">マイリスト名を変更</DialogTitle>
                <DialogContent>
                    <TextField id="outlined-basic" defaultValue={mylistContentsState.name} onChange={handleNewMylistName}/>
                    <DialogActions>
                        <Button onClick={handleCloseEditMylistName} color="primary" style={{position:"absolute",left:"20px"}}>
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
                        <Button onClick={handleCloseDeleteConfirm} color="primary" style={{position:"absolute",left:"20px"}}>
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