import * as React from 'react';
import { Link } from 'react-router-dom';
import { MylistType } from '../types';

interface Props{
    mylist:MylistType
}

export const MylistWrapper:React.FC<Props> = (props:Props) => {
    const mylist = props.mylist

    return(
        <>
            <div>
                <Link to={`/mylist_contents/${mylist.id}`} >
                    {mylist.name}
                </Link>
            </div>
        </>
    )
}