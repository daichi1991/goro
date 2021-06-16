import * as React from 'react'
import { MylistsContext } from '../../../contexts/mylistContexts';
import { MylistContentsType, MylistType } from '../types'
import {useParams} from 'react-router-dom'
import { getItemMylistsIndex } from '../../../apis/itemMylist';
import { MylistContentsWrapper } from './mylistContensWrapper';

const {useEffect, useState} = React;

interface ParamTypes {
    mylistId: string
}

export const MylistContents:React.FC = ()=> {

    const {mylistId} = useParams<ParamTypes>();
    const [mylistContents, setMylistContents] = useState<MylistContentsType[]>([]);

    useEffect(() => {
        getItemMylistsIndex(mylistId)
        .then((data) =>{
            setMylistContents(data);
            console.log(data);
        })
    }, [])

    return(
        <>
            {mylistContents.map((mylistContens, index) =>
                <MylistContentsWrapper key={index} mylistContens={mylistContens} />
            )}
        </>
    )
}