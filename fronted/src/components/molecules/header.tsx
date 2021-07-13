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
import { Typography } from '@material-ui/core';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.white,
        },
        },
    },
}))(MenuItem);

const HeaderWrapper = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    width:100vw;
    max-height: 40px;
    padding:4px;
    line-height: 2rem;
`

const HeaderTitle = styled.div`
    margin-left: 40px;
    color: white;
    font-size: 1.4rem;
`
const UserMenu = styled.div`
    margin-left: auto;
    margin-right: 40px;
    color: white;
    font-size: 1.6rem;
`


export const Header: React.FC = () => {
    const classes = useStyles();
    const authUser = React.useContext(AuthUserContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const signOut = useSignOut();

    const handleSignOut = () =>{
        setAnchorEl(null);
        signOut();
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <AppBar position="fixed" className={classes.appBar}>
            <ToolBar>
                <Typography variant="h6" noWrap>
                    ごろりんちょ
                </Typography>
            </ToolBar>
            {/* {authUser?
                <>
                    <UserMenu
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        color="primary"
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </UserMenu>
                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <Link to={'user_setting'} style={{ textDecoration: 'none',color:'black' }} onClick={handleClose}>
                            <StyledMenuItem>
                                    <ListItemIcon>
                                        <PersonIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="アカウント設定" />
                            </StyledMenuItem>
                        </Link>
                        <StyledMenuItem onClick={handleSignOut}>
                            <ListItemIcon>
                                <ExitToAppIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="ログアウト" />
                        </StyledMenuItem>
                    </StyledMenu>
                </>:
                <></>
            } */}
        </AppBar>
    )
}