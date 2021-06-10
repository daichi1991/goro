import * as React from 'react';
import PropTypes from 'prop-types';
import { getMylists } from '../apis/mylist';
import { MylistType } from '../components/molecules/types';

const {useEffect, useState} = React;

export const MylistsContext = React.createContext({} as {
    mylistsState:MylistType[],
    setMylists:React.Dispatch<React.SetStateAction<MylistType[]>>
});

const MylistsProvider:React.FC = (children) => {

    const [mylistsState, setMylists] = useState<MylistType[]>([]);

    useEffect(() =>{
        getMylists()
        .then((data: React.SetStateAction<MylistType[]>) =>{
            setMylists(data);
        })
    },[])

    return(
        <MylistsContext.Provider value={{mylistsState, setMylists}}>
            {children.children}
        </MylistsContext.Provider>
    )
}

MylistsProvider.propTypes = {
    children:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]).isRequired,
    type: PropTypes.string,
}

export default MylistsProvider