import React, { ReactEventHandler } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Folder, Search, Person } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

export const FooterMenu:React.FC = () =>{

    const useStyles = makeStyles({
        root: {
        position: 'fixed',
        bottom: 0,
        width: 500,
        },
        content:{
            flexGrow: 1,
            paddingLeft: 0,
            paddingRight: 0,
        }
    });

    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

    return(
        <BottomNavigation value={value} className={classes.root}>
            <BottomNavigationAction
                component={Link}
                to="/"
                label="search"
                value="search"
                icon={<Search />}
                className={classes.content}
            />
            <BottomNavigationAction
                component={Link}
                to="/mylists"
                label="mylists"
                value="mylists"
                icon={<Folder />}
                className={classes.content}
            />
            <BottomNavigationAction
                component={Link}
                to="/user_menu"
                label="user_menu"
                value="user_menu"
                icon={<Person />}
                className={classes.content}
            />
        </BottomNavigation>
    );
}