import * as React from 'react'
import { MylistContentsType, MylistItemType } from '../types'

import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { deleteItemMylist, patchItemMylists } from '../../../apis/itemMylist';
import { MylistContentsContext } from '../../../contexts/mylistContensContexts';
import { Backdrop, Fade, makeStyles, Modal } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import StarIcon from './star.svg';
import StarHarfIcon from './star.svg';
import StarBorderIcon from './star.svg';
import { Star, StarBorder, StarHalf } from '@material-ui/icons';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {AccordionSummaryProps,} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';

import Popper from '@mui/material/Popper';
import { getProfile } from '../../../apis/user';

import {Avatar, Dialog} from '@material-ui/core';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { itemJsonUrl } from '../../../urls';


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
    avaterBtn:{
        position:"absolute",
        right: '160px',
        top: '50%',
        transform: 'translate(0, -50%)'
    },
    memoryBtn: {
        position:"absolute",
        right: '80px',
        top: '50%',
        transform: 'translate(0, -50%)'
    },
    deleteBtn: {
        position:"absolute",
        right: 0,
        top: '50%',
        transform: 'translate(0, -50%)',
        color: "#c1c1c1",
    },
}));


interface Props{
    item:MylistItemType;
}

interface MemoryIconProps{
    memoryLevel:number
}

const MemoryIcon = (props:MemoryIconProps) =>{
    let memIcon;
    switch (props.memoryLevel) {
        case 0:
            memIcon = <StarBorder />;
            break;
        case 1:
            memIcon = <StarHalf />;
            break;
        case 2:
            memIcon = <Star />;
            break;
        default:
            memIcon = <StarBorder />;
            break;
    }
    return memIcon;
};


export const MylistContentsWrapper:React.FC<Props> = (props:Props) => {

    const item = props.item
    const {mylistContentsState, setMylistContents} = useContext(MylistContentsContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const [newExpanded, setNewExpanded] = React.useState<boolean>(false);

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [menuAnchorEl, setMenuAnchorEl] = useState<null| HTMLElement>(null);
    const [avaterImageUrl, setAvaterImageUrl] = useState<string>('');

    const [userItemUrl, setUserItemUrl] = useState<string>('');

    const menuOpen = Boolean(menuAnchorEl);
    const menuId = menuOpen ? 'menu-popper' : undefined;

    const getMyprofileImage = async() =>{
        const profileId = await getProfile(item.item_user_id);
        setUserItemUrl(`/users/items/${item.item_user_id}`);
        setAvaterImageUrl(`http://localhost:3000/uploads/profile/image/${profileId}/avater.jpg`);
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDeleteMylistContent = () =>{
        const newMylistContents:MylistContentsType = {id:'',name:''};
        newMylistContents.id = mylistContentsState.id;
        newMylistContents.name = mylistContentsState.name;

        const allMylistContents = [...mylistContentsState.items!];
        const targetIndex:number = allMylistContents.findIndex(({item_mylist_id}) => item_mylist_id ===item.item_mylist_id);
        allMylistContents.splice(targetIndex,1);

        deleteItemMylist(item.item_mylist_id);
        
        newMylistContents.items = allMylistContents;

        setMylistContents(newMylistContents);
        
    };


    const handleChange = () => {
        const panel = 'panel1'
        setNewExpanded(!newExpanded);
        setExpanded(newExpanded ? panel : false);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(menuAnchorEl ? null : event.currentTarget);
    };

    const handleMemoryLevel = () => {
        let memoryLevel = item.memory_level;
        memoryLevel < 2?memoryLevel += 1:memoryLevel=0
        patchItemMylists(item.item_mylist_id, mylistContentsState.id, item.id, memoryLevel)

        const mylistContentItems = mylistContentsState.items?[...mylistContentsState.items]:undefined;
        const newMylistContent:MylistContentsType ={
            id:mylistContentsState.id,
            name:mylistContentsState.name,
            items:mylistContentItems,
        }
        const itemIndex = newMylistContent.items!.findIndex( ({item_mylist_id}) => item_mylist_id === item.item_mylist_id );
        newMylistContent.items![itemIndex].memory_level = memoryLevel;
        setMylistContents(newMylistContent);

    };

    const handleOpenForm = () =>{
        setOpen(true);
    };

    const handleClose = () =>{
        setOpen(false);
    };

    const Accordion = styled((props: AccordionProps) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
        borderBottom: 0,
    },
        '&:before': {
        display: 'none',
    },
    }));

    const AccordionSummary = styled((props: AccordionSummaryProps) => (
        <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
    ))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    }));
    
    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));

    useEffect(()=>{
        getMyprofileImage();
    } ,[])

    return(
        <>
            <Box sx={{flexGrow: 1}}>
                <Accordion >
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>{item.title}</Typography>
                        <Link to={userItemUrl} className={classes.avaterBtn}>
                            {avaterImageUrl?
                                <Avatar alt="g" src={avaterImageUrl} />:
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                            }
                        </Link>            
                        <Button onClick={handleMemoryLevel} className={classes.memoryBtn}>
                            <MemoryIcon memoryLevel={item.memory_level} />
                        </Button>
                        <Button onClick={handleOpenForm} className={classes.deleteBtn}>
                            <DeleteIcon/>
                        </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {item.year_type==='紀元前'?'紀元前':''}
                            {item.year}
                            {item.year_type==='紀元前'||item.year_type==='紀元後'?'年':item.year_type}
                            <br/>
                            {item.goro_text}
                            <br/>
                            {item.description}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">マイリストから削除</DialogTitle>
                <DialogContent>
                    <DialogActions>
                    <Typography>
                        <div onClick={handleDeleteMylistContent}>
                            完了
                        </div>
                    </Typography>
                    </DialogActions>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        キャンセル
                    </Button>
                </DialogActions>
            </Dialog>
        </>



    )
}