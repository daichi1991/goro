import * as React from 'react'
import { MylistItemType } from '../types'

import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';


interface Props{
    item:MylistItemType;
}

export const MylistContentsWrapper:React.FC<Props> = (props:Props) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);    
    const item = props.item

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <>
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
                        <Typography>The content of the Popover.</Typography>
                        </Box>
                    </Popover>
                    </div>
                )}
            </PopupState>

        </>
    )
}