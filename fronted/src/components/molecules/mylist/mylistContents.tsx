import * as React from 'react'
import { MylistsContext } from '../../../contexts/mylistContexts';
import { MylistContentsType, MylistItemType, MylistType } from '../types'
import {useParams} from 'react-router-dom'
import { deleteItemMylist, getItemMylistShow } from '../../../apis/itemMylist';
import { MylistContentsWrapper } from './mylistContensWrapper';
import { MylistContentsContext } from '../../../contexts/mylistContensContexts';

const {useEffect, useState} = React;



interface ParamTypes {
    mylistId: string
}

export const MylistContents:React.FC = ()=> {

    const {mylistId} = useParams<ParamTypes>();
    const {mylistContentsState, setMylistContents} = React.useContext(MylistContentsContext);


    useEffect(() => {
        getItemMylistShow(mylistId)
        .then((data) =>{
            setMylistContents(data);
        })
    }, [])

    return(
        <>
            {mylistContentsState?.items?.map((item, index) =>
                <MylistContentsWrapper key={index} item={item} />
            )}
        </>
    )
}