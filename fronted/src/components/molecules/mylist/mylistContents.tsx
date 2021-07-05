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


    useEffect(() => {
        getItemMylistShow(mylistId)
        .then((data) =>{
            setMylistContents(data);
        })
    }, [])

    const handleDeleteMylist = () =>{
        const newMylists = [...mylistsState]
        const targetIndex:number = newMylists.findIndex(({id}) => id ===mylistId);
        newMylists.splice(targetIndex,1);
        
        deleteMylist(mylistId);
        setMylists(newMylists);
        props.history.replace(
            {pathname: "/mylists",
            state: { deleteMylistName: mylistContentsState.name}
            }
        )
    }

    return(
        <>
            {mylistContentsState.name}
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
                                        <div onClick={handleDeleteMylist}>
                                            削除
                                        </div>
                                    </Typography>
                                    </Box>
                                </Popover>
                            </div>
                            )}
                        </PopupState>
            {mylistContentsState?.items?.map((item, index) =>
                <MylistContentsWrapper key={index} item={item} />
            )}
        </>
    )
}