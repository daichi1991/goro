import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {useStyles} from '../../utils/style';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ToolBar from '@material-ui/core/Toolbar'
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import {useSignOut, AuthUserContext, useSignInCheck} from '../../contexts/authUserContext'
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar, Button, IconButton, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import axios from 'axios';
import { myProfileUrl } from '../../utils/urls';
import * as H from 'history';

const {useState, useEffect} = React;

const handleSignInCheck = async() =>{
    await useSignInCheck;
}


export const Header: React.FC = () => {
    const classes = useStyles();
    const isAuthenticated = React.useContext(AuthUserContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [myProfileId, setMyProfileId] = useState<string>('');
    const open = Boolean(anchorEl);

    const getMyProfile = () =>{
        axios.get(myProfileUrl,{
            headers:{
                "Content-Type": "application/json",
            }, withCredentials: true 
        })
        .then(res =>{
            setMyProfileId(res.data.id);
            console.log(res)
        })
    }

    useEffect(()=>{
        isAuthenticated && getMyProfile();
    } ,[isAuthenticated])

    const avaterImageUrl = `http://localhost:3000/uploads/profile/image/${myProfileId}/avater.jpg`

    const signOut = useSignOut();

    const handleSignOut = () =>{
        setAnchorEl(null);
        signOut();
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <AppBar position="fixed" className={classes.header}>
            <ToolBar>
                <Typography variant="h6" noWrap className={classes.headerTitle}>
                    <Link to="/" style={{textDecoration:"none",color:"#fff"}}>
                    語呂合わせアプリ
                    </Link>
                </Typography>

            {isAuthenticated?
                    <div>
                        <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        >
                            {myProfileId?
                                <Avatar src={avaterImageUrl} />:
                                (<Avatar>
                                    <PersonIcon />
                                </Avatar>)
                            }
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                        >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <Link to="/user_setting">
                            <MenuItem onClick={handleClose}>アカウント設定</MenuItem>
                        </Link>
                        <Button onClick={handleSignOut}>
                            ログアウト
                        </Button>
                        </Menu>
                </div>:
                <Link to="/sign_in" style={{textDecoration:"none",color:"#fff"}}>
                    ログイン
                </Link>
            }
            </ToolBar>
        </AppBar>
    )
}