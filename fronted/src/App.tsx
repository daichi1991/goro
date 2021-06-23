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
import AuthUserProvider, { useAuthUser } from './contexts/authUserContext';
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
import { MylistContents } from './components/molecules/mylist/mylistContents';

const UnAuthRoute: React.FC<RouteProps> = ({ ...props }) => {
  const authUser = useAuthUser()
  console.log(authUser);
  const isAuthenticated = authUser === true;
  //const {from} = useLocation<{from:string | undefined}>().state

  if (isAuthenticated) {
    console.log(`ログイン済みのユーザーは${props.path}へはアクセスできません`)
    return <Redirect to={'/'} />
  } else {
    return <Route {...props} />
  }
}

const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const authUser = useAuthUser()
  console.log(authUser);
  const isAuthenticated = authUser != null
  if (isAuthenticated) {
    return <Route {...props} />
  } else {
    console.log(
      `ログインしていないユーザーは${props.path}へはアクセスできません`,
    )
    return (
      <Redirect
        to={{ pathname: '/', state: { from: props.location?.pathname } }}
      />
    )
  }
}



function App() {
  return (
    <AuthUserProvider>
      <ItemsProvider>
        <MylistsProvider>
          <Router>
            <Header />
            <Switch>
              <Route exact path = '/' component={ItemsList}/>
              <PrivateRoute exact path = '/mylists' component={Mylists}/>
              <PrivateRoute exact path = '/user_menu' component={UserMenu}/>
              <PrivateRoute exact path = '/mylist/show/:mylistId' component={MylistContents}/>
              <UnAuthRoute exact path='/sign_in' component={UserSignIn}/>
              <UnAuthRoute exact path='/sign_up' component={UserSignUp}/>
              <UnAuthRoute exact path='/sign_up_send_mail' component={UserSignUpSendMail}/>
              <UnAuthRoute exact path='/sign_up_confirm' component={UserSignUpConfirm}/>
              <Redirect to="/"/>
            </Switch>
            <FooterMenu />
          </Router>
        </MylistsProvider>
      </ItemsProvider>
    </AuthUserProvider>
  )
}

export default App
