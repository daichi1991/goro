import * as React from 'react';
import { postItemMylists } from '../../../apis/itemMylist';
import { ItemType, MylistType } from '../types';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

const {useState} = React;

function Alert(props: JSX.IntrinsicAttributes & AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props{
    item:ItemType;
    mylist:MylistType;
}

export const MylistModal:React.FC<Props> = (props:Props) =>{

    const item = props.item
    const mylist = props.mylist

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleAddToMylist = () =>{
        postItemMylists(mylist.id, item.id)
        .then(() =>{
            setOpenSnackbar(true);
        }
        )
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return(
        <>
            <div onClick={handleAddToMylist}>
                {mylist.name}
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                {mylist.name}に追加しました
                </Alert>
            </Snackbar>
        </>
    )
}