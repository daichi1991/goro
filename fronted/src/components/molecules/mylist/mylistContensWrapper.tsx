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

import {Avatar} from '@material-ui/core';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';


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




    
    const {mylistContentsState, setMylistContents} = useContext(MylistContentsContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);    
    const item = props.item
    const [memoryLevelState, setMemoryLevel] = useState<number>(item.memory_level);
    const [memoryLevelIcon, setMemoryLevelIcon] = useState<any>(StarBorder)

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
        console.log(userItemUrl);
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

    const handleOpen = () =>{
        setOpen(true);
    };

    const handleClose = () =>{
        setOpen(false);
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
        let memoryLevel = memoryLevelState;
        memoryLevel < 2?memoryLevel += 1:memoryLevel=0
        setMemoryLevel(memoryLevel);

        switch (memoryLevel) {
            case 0:
                setMemoryLevelIcon(StarBorder);
                break;
            case 1:
                setMemoryLevelIcon(StarHalf);
                break;
            case 2:
                setMemoryLevelIcon(Star);
                break;
            default:
                setMemoryLevelIcon(StarBorder);
        }

        patchItemMylists(item.item_mylist_id, mylistContentsState.id, item.id, memoryLevel)

    }

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
                    <Grid container spacing={2}>
                        <Grid item md={9}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>{item.title}</Typography>
                            </AccordionSummary>
                        </Grid>
                        <Grid item md={1}>
                            <Link to={userItemUrl}>
                                {avaterImageUrl?
                                    <Avatar alt="g" src={avaterImageUrl} />:
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                                }
                            </Link>
                        </Grid>                 
                        <Grid item md={1}>
                            <div onClick={handleMemoryLevel}>
                                <MemoryIcon memoryLevel={memoryLevelState} />
                            </div>
                        </Grid>
                        <Grid item md={1}>

                        {<PopupState variant="popover" popupId="menu-popup-popover">
                                {(popupState: any) => (
                                    <div>
                                        <div {...bindTrigger(popupState)}>
                                            <MoreHorizIcon/>
                                        </div>
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
                                                    <div onClick={handleDeleteMylistContent}>
                                                        削除
                                                    </div>
                                                </Typography>
                                            </Box>
                                        </Popover>
                                    </div>
                                )}
                            </PopupState>
                            }
                        </Grid>
                    </Grid>
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
        </>



    )
}