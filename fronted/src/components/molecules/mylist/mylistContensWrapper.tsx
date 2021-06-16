import * as React from 'react'
import { MylistContentsType } from '../types'

interface Props{
    mylistContens:MylistContentsType;
}

export const MylistContentsWrapper:React.FC<Props> = (props:Props) => {
    
    const mylistContens = props.mylistContens

    return(
        <>
            {mylistContens.id}
        </>
    )
}