import * as React from 'react'
import { MylistItemType } from '../types'

interface Props{
    item:MylistItemType;
}

export const MylistContentsWrapper:React.FC<Props> = (props:Props) => {
    
    const item = props.item

    return(
        <>
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.year}</p>
            <p>{item.year_type}</p>
            <p>{item.goro_text}</p>
            <p>{item.description}</p>
        </>
    )
}