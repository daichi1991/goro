import { CssBaseline } from '@material-ui/core'
import React from 'react'
import useMedia from 'use-media'
import './App.css'
import { Container } from './components/molecules/container'
import AuthUserProvider from './contexts/authUserContext'
import ItemsProvider from './contexts/itemsContexts'
import MylistContentsProvider from './contexts/mylistContensContexts'
import MylistsProvider from './contexts/mylistContexts'
import { useStyles } from './utils/style'

const App: React.FC = () => {
  const classes = useStyles()
  const isWide = useMedia({ minWidth: '760px' })

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AuthUserProvider>
        <ItemsProvider>
          <MylistsProvider>
            <MylistContentsProvider>
              <Container />
            </MylistContentsProvider>
          </MylistsProvider>
        </ItemsProvider>
      </AuthUserProvider>
    </div>
  )
}

export default App
