import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Folder, Person, Search } from '@material-ui/icons'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Link } from 'react-router-dom'

export const FooterMenu: React.FC = () => {
  const useStyles = makeStyles({
    footer: {
      position: 'fixed',
      zIndex: 101,
      bottom: 0,
      width: '100%',
    },
    footerContent: {
      flexGrow: 1,
      paddingLeft: 0,
      paddingRight: 0,
    },
  })

  const classes = useStyles()
  const [value, setValue] = React.useState('search')

  return (
    <BottomNavigation
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue)
      }}
      className={classes.footer}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        value="search"
        icon={<Search />}
        className={classes.footerContent}
      />
      <BottomNavigationAction
        component={Link}
        to="/mylists"
        value="mylists"
        icon={<Folder />}
        className={classes.footerContent}
      />
      <BottomNavigationAction
        component={Link}
        to="/user_menu"
        value="user_menu"
        icon={<Person />}
        className={classes.footerContent}
      />
    </BottomNavigation>
  )
}
