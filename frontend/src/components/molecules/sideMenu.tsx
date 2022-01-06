import React from "react";
import {useStyles} from '../../utils/style';

import { Link } from 'react-router-dom';

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem,{ListItemProps} from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Folder, Search, Person } from '@material-ui/icons';

    export default function SideMenu() {
    const classes = useStyles();

    const ListItemLink = (props: ListItemProps<'a', { button?: true }>) =>{
        return <ListItem button component="a" {...props} />
    }  

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    <ListItemLink href="/">
                        <ListItemIcon>
                            <Search />
                        </ListItemIcon>
                        <ListItemText primary="Search" />
                    </ListItemLink>

                    <ListItemLink href="/mylists">
                        <ListItemIcon>
                            <Folder />
                        </ListItemIcon>
                        <ListItemText primary="Mylist" />
                    </ListItemLink>

                    <ListItemLink href="/user_menu" >
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary="Your Items" />
                    </ListItemLink>
                </List>
            </div>
        </Drawer>
    );
}
