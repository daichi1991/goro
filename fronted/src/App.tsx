import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
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

const UnAuthRoute: React.FC<RouteProps> = ({ ...props }) => {
  const authUser = useAuthUser()
  const isAuthenticated = authUser != null
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
  const isAuthenticated = authUser != null
  if (isAuthenticated) {
    return <Route {...props} />
  } else {
    console.log(
      `ログインしていないユーザーは${props.path}へはアクセスできません`,
    )
    return (
      <Redirect
        to={{ pathname: '/top', state: { from: props.location?.pathname } }}
      />
    )
  }
}

function App() {
  return (
    <AuthUserProvider>
      <Router>
        <Header />
        <Switch>
          <UnAuthRoute exact path='/sign_in' component={UserSignIn}/>
          <UnAuthRoute exact path='/sign_up' component={UserSignUp}/>
          <UnAuthRoute exact path='/sign_up_send_mail' component={UserSignUpSendMail}/>
          <Menu />
        </Switch>
      </Router>
    </AuthUserProvider>
  )
}

export default App
