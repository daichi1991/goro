import * as React from 'react'
import { MylistsContext } from '../../../contexts/mylistContexts';
import { MylistContentsType, MylistType } from '../types'
import {useParams} from 'react-router-dom'
import { getItemMylistShow } from '../../../apis/itemMylist';
import { MylistContentsWrapper } from './mylistContensWrapper';

const {useEffect, useState} = React;

interface ParamTypes {
    mylistId: string
}

export const MylistContents:React.FC = ()=> {

    const {mylistId} = useParams<ParamTypes>();
    const [mylistContents, setMylistContents] = useState<MylistContentsType | undefined>(undefined);

    useEffect(() => {
        getItemMylistShow(mylistId)
        .then((data) =>{
            console.log(data);
            setMylistContents(data);
        })
    }, [])

    return(
        <>
            {mylistContents?.items?.map((item, index) =>
                <MylistContentsWrapper key={index} item={item} />
            )}
        </>
    )
}