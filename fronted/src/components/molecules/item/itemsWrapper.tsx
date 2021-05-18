import * as React from 'react';
import { ItemType } from '../types';

interface Props{
    item:ItemType;
}

export const ItemsWrapper:React.FC<Props> = (props:Props) =>{

    const item = props.item;

    return(
        <>
            {item.title}
        </>
    )
}