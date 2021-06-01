import React, { ReactEventHandler } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Home, Folder } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

export const FooterMenu:React.FC = () =>{

    const useStyles = makeStyles({
        root: {
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
                label="home"
                value="home"
                icon={<Home />}
                className={classes.content}
            />
            <BottomNavigationAction
                component={Link}
                to="/my_item"
                label="my_item"
                value="my_item"
                icon={<Folder />}
                className={classes.content}
            />
        </BottomNavigation>
    );
}