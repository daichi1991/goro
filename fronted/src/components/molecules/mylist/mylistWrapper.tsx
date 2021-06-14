import * as React from 'react';
import { MylistType } from '../types';

interface Props{
    mylist:MylistType
}

export const MylistWrapper:React.FC<Props> = (props:Props) => {
    const mylist = props.mylist

    return(
        <>
            {mylist.name}
        </>
    )
}