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
import {useSignOut} from '../../contexts/authUserContext'
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {AuthUserContext} from '../../contexts/authUserContext';
import { IconButton, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';






export const Header: React.FC = () => {
    const classes = useStyles();
    const authUser = React.useContext(AuthUserContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    console.log(authUser);

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
        <div className={classes.header}>
        <AppBar position="fixed">
            <ToolBar>
                <Typography variant="h6" noWrap className={classes.headerTitle}>
                    ごろりんちょ
                </Typography>

            {authUser && (
                    <div>
                        <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        >
                            <AccountCircle />
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
                        <Link to="/avater_upload">
                            <MenuItem onClick={handleClose}>アカウント設定</MenuItem>
                        </Link>
                        </Menu>
                </div>
            )
            }
            </ToolBar>
        </AppBar>
        </div>
    )
}