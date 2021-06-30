import * as React from 'react'
import { MylistContentsType, MylistItemType } from '../types'

import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { deleteItemMylist } from '../../../apis/itemMylist';
import { MylistContentsContext } from '../../../contexts/mylistContensContexts';


interface Props{
    item:MylistItemType;
}

export const MylistContentsWrapper:React.FC<Props> = (props:Props) => {
    
    const {mylistContentsState, setMylistContents} = React.useContext(MylistContentsContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);    
    const item = props.item

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
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

    return(
        <>
            <p>{item.item_mylist_id}</p>
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.year}</p>
            <p>{item.year_type}</p>
            <p>{item.goro_text}</p>
            <p>{item.description}</p>

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

        </>
    )
}