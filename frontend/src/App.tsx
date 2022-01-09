import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';
import {useStyles} from './utils/style';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AuthUserProvider from './contexts/authUserContext';
import { Header } from '../src/components/molecules/header';
import { Menu } from '../src/components/molecules/menu';
import { UserSignIn } from './components/molecules/user/userSignIn';
import { UserSignUp } from './components/molecules/user/userSignUp';
import { UserSignUpSendMail } from './components/molecules/user/userSignUpSentMail';
import { UserSignUpConfirm } from './components/molecules/user/userSignUpConfirm';
import ItemsProvider, { ItemsContext } from './contexts/itemsContexts';
import { ItemsList } from './components/molecules/item/itemsList';
import { UserMenu } from './components/molecules/item/UserMenu';
import { FooterMenu } from './components/molecules/footerMenu';
import { Mylists } from './components/molecules/mylist/mylists';
import MylistsProvider from './contexts/mylistContexts';
import MylistContentsProvider from './contexts/mylistContensContexts';
import { MylistContents } from './components/molecules/mylist/mylistContents';
import SideMenu from './components/molecules/sideMenu';
import useMedia from 'use-media';
import { CssBaseline } from '@material-ui/core';
import { AvaterUpload } from './components/molecules/user/avaterUpload';
import { OtherUserMenu } from './components/molecules/item/otherUserItems';
import { UserSetting } from './components/molecules/user/userSetting';
import { UsernameSetting } from './components/molecules/user/usernameSetting';
import { Container } from './components/molecules/container'

// const UnAuthRoute: React.FC<RouteProps> = ({ ...props }) => {
//   const authUser = useAuthUser()
//   const isAuthenticated = authUser === true;
//   //const {from} = useLocation<{from:string | undefined}>().state

//   if (isAuthenticated) {
//     console.log(`ログイン済みのユーザーは${props.path}へはアクセスできません`)
//     return <Redirect to={'/'} />
//   } else {
//     return <Route {...props} />
//   }
// }

// const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
//   const authUser = useAuthUser()
//   const isAuthenticated = authUser != false;
//   if (isAuthenticated) {
//     return <Route {...props} />
//   } else {
//     console.log(
//       `ログインしていないユーザーは${props.path}へはアクセスできません`,
//     )
//     return (
//       <Redirect
//         to={{ pathname: '/sign_in', state: { from: props.location?.pathname } }}
//       />
//     )
//   }
// }



function App() {
  const classes = useStyles();
  const isWide = useMedia({ minWidth: "760px" });
  const contentMarginLeft = isWide?170:0;

  return (
    <div className = {classes.root}>
      <CssBaseline/>
      <AuthUserProvider>
        <ItemsProvider>
          <MylistsProvider>
            <MylistContentsProvider>
              {/* <Router>
                <Header />
                <div className={classes.appBody}>
                  {isWide? <SideMenu /> : <FooterMenu />}
                  <div className={classes.content} style={{marginLeft:contentMarginLeft}}>
                    <Switch>
                      <Route exact path = '/' component={ItemsList}/>
                      <PrivateRoute exact path = '/user_setting' component={UserSetting}/>
                      <PrivateRoute exact path = '/username_setting' component={UsernameSetting} />
                      <PrivateRoute exact path = '/avater_upload' component={AvaterUpload}/>
                      <PrivateRoute exact path = '/mylists' component={Mylists}/>
                      <PrivateRoute exact path = '/user_menu' component={UserMenu}/>
                      <PrivateRoute exact path = '/mylist/show/:mylistId' component={MylistContents}/>
                      <PrivateRoute exact path = '/users/items/:userId' component={OtherUserMenu}/>
                      <UnAuthRoute exact path='/sign_in' component={UserSignIn}/>
                      <UnAuthRoute exact path='/sign_up' component={UserSignUp}/>
                      <UnAuthRoute exact path='/sign_up_send_mail' component={UserSignUpSendMail}/>
                      <UnAuthRoute exact path='/sign_up_confirm' component={UserSignUpConfirm}/>
                      <Redirect to="/"/>
                    </Switch>
                  </div>
                </div>
              </Router> */}
              <Container />
            </MylistContentsProvider>
          </MylistsProvider>
        </ItemsProvider>
      </AuthUserProvider>
    </div>
  )
}

export default App