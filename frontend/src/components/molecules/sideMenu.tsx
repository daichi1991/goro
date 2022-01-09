import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import { Folder, Person, Search } from '@material-ui/icons'
import React from 'react'
import { useStyles } from '../../utils/style'

export default function SideMenu() {
  const classes = useStyles()

  const ListItemLink = (props: ListItemProps<'a', { button?: true }>) => {
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

          <ListItemLink href="/user_menu">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Your Items" />
          </ListItemLink>
        </List>
      </div>
    </Drawer>
  )
}
