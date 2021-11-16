import * as React from 'react';
import {useParams,useHistory,useLocation,} from 'react-router-dom';
import { getItems, getMyItems, getUserItems, postItems } from '../../../apis/item';
import { MyItemsContext } from '../../../contexts/itemsContexts';
import { ItemType } from '../types';
import { ItemsWrapper } from './itemsWrapper';
import useMedia from "use-media";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { Avatar, InputLabel, MenuItem, Select } from '@material-ui/core';
import { getProfile } from '../../../apis/user';
import PersonIcon from '@mui/icons-material/Person';


const {useContext, useEffect, useState} = React;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
        position: "relative"
        },
        title: {
        marginLeft: theme.spacing(2),
        flex: 1
        }
    })
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

export const OtherUserMenu:React.FC = () =>{
    const classes = useStyles();
    const isWide = useMedia({ minWidth: "750px" });

    const params:{userId:string} = useParams(); 
    
    const {myItemsState, setMyItems} = useContext(MyItemsContext);
    
    const [open, setOpen] = useState(false);
    
    const [itemTitle, setItemTitle] = useState("");
    const [itemYear, setItemYear] = useState("");
    const [itemYearType, setItemYearType] = useState("");
    const [itemGoroText, setItemGoroText] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [userItemUrl, setUserItemUrl] = useState<string>('');
    const [avaterImageUrl, setAvaterImageUrl] = useState<string>('');

    const getProfileImage = async() =>{
        const profileId = await getProfile(params.userId);
        setAvaterImageUrl(`http://localhost:3000/uploads/profile/image/${profileId}/avater.jpg`);
    }

    const handleOpenForm = () =>{
        setOpen(true);
    };

    const handleClose = () =>{
        setOpen(false);
    };

    const handleItemTitle = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setItemTitle(event.target.value);
    };

    const handleItemYearType = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setItemYearType(event.target.value);
    };

    const handleItemYear = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setItemYear(event.target.value);
    };

    const handleItemGoroText = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setItemGoroText(event.target.value);
    };

    const handleItemDescription = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setItemDescription(event.target.value);
    };

    const handleClearState = () =>{
        setItemTitle("");
        setItemYear("");
        setItemYearType("");
        setItemGoroText("");
        setItemDescription("");
    };

    const handleMyItems = () =>{
        const randomId = Math.random().toString(36).slice(-8);
        const newItem:ItemType = {
            id:randomId,
            user_id:"",
            title:itemTitle,
            year:itemYear,
            year_for_sort:0,
            year_type:itemYearType,
            goro_text:itemGoroText,
            description:itemDescription
        }
        const newMyItems = [...myItemsState, newItem];
        setMyItems(newMyItems);

    }

    const handleAddItem = () =>{
        postItems(itemTitle, itemYear, itemYearType, itemGoroText, itemDescription)
        .then(() =>{
            handleMyItems();
            handleClearState();
            setOpen(false);        
        }
        )
        
    };

    useEffect(() =>{
        if(params.userId){
            getProfileImage();
            getUserItems(params.userId)
            .then((data: React.SetStateAction<ItemType[]>) =>{
                setMyItems(data);
            })
        }
    },[])

    return(
        <>
            {avaterImageUrl?
                <Avatar alt="g" src={avaterImageUrl} />:
            <Avatar>
                <PersonIcon />
            </Avatar>
            }
            <h3>アイテムリスト</h3>
            {myItemsState.map((myItem,index) =>
                <ItemsWrapper key={index} item={myItem} />
            )}
            
        </>
    )
}