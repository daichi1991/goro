import * as React from 'react'
import { MylistContentsType, MylistItemType } from '../types'

import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Box from '@material-ui/core/Box';
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

    const classes = useStyles();
    const [open, setOpen] = useState(false);

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


    return(
        <>
            <span onClick={handleOpen}>{item.title}</span>
            <span onClick={handleMemoryLevel}>
                <MemoryIcon memoryLevel={memoryLevelState} />
            </span>
            
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
                        {item.title}
                        
                        <PopupState variant="popover" popupId="demo-popup-popover">
                        {(popupState: any) => (
                            <div>
                                <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
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
                                        <div onClick={handleDeleteMylistContent}>
                                            削除
                                        </div>
                                    </Typography>
                                    </Box>
                                </Popover>
                            </div>
                            )}
                        </PopupState>
                        <span onClick={handleMemoryLevel}>
                            記憶度：<MemoryIcon memoryLevel={memoryLevelState} />
                        </span>
                        <p>{item.year}</p>
                        <p>{item.year_type}</p>
                        <p>{item.goro_text}</p>
                        <p>{item.description}</p>
                    </div>
                </Fade>
            </Modal>



        </>
    )
}