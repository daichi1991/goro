import * as React from 'react';
import { MylistsContext } from '../../../contexts/mylistContexts';
import { MylistWrapper } from './mylistWrapper';

const {useContext, useState} = React;

export const Mylists:React.FC = () =>{
    
    const {mylistsState, setMylists} = useContext(MylistsContext);

    return(
        <>
            <h3>マイリスト</h3>
            {mylistsState.map((mylist, index) => 
                <MylistWrapper key={index} mylist={mylist} />
            )}
        </>
    )
}