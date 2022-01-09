import * as React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Redirect,
    Route,
    RouteProps,
    Switch,
} from 'react-router-dom';
import {useStyles} from '../.././utils/style';
import AuthUserProvider, { useAuthUser,AuthUserContext, useSignInCheck, SignInCheckContext, useGetSignInCheck } from '../../contexts/authUserContext';
import { Header } from '../../../src/components/molecules/header';
import { UserSignIn } from '../.././components/molecules/user/userSignIn';
import { UserSignUp } from '../.././components/molecules/user/userSignUp';
import { UserSignUpSendMail } from '../.././components/molecules/user/userSignUpSentMail';
import { UserSignUpConfirm } from '../.././components/molecules/user/userSignUpConfirm';
import ItemsProvider, { ItemsContext } from '../.././contexts/itemsContexts';
import { ItemsList } from '../.././components/molecules/item/itemsList';
import { UserMenu } from '../.././components/molecules/item/UserMenu';
import { FooterMenu } from '../.././components/molecules/footerMenu';
import { Mylists } from '../.././components/molecules/mylist/mylists';
import MylistsProvider from '../.././contexts/mylistContexts';
import MylistContentsProvider from '../.././contexts/mylistContensContexts';
import { MylistContents } from '../.././components/molecules/mylist/mylistContents';
import SideMenu from '../.././components/molecules/sideMenu';
import useMedia from 'use-media';
import { CssBaseline } from '@material-ui/core';
import { AvaterUpload } from '../.././components/molecules/user/avaterUpload';
import { OtherUserMenu } from '../.././components/molecules/item/otherUserItems';
import { UserSetting } from '../.././components/molecules/user/userSetting';
import { UsernameSetting } from '../.././components/molecules/user/usernameSetting';
import { AuthUser } from './types';

const {useState, useEffect, useContext,useLayoutEffect} = React;

// let getAuthUser;

// const handleAuthUser = async() =>{
//     const authUser = getAuthUser;
//     return authUser;
// }

const handleSignInCheck = async() =>{
    useGetSignInCheck;
}

export type ProtectedRouteProps = {
    isAuthenticated: boolean;
    authenticationPath: string;
} & RouteProps;

const UnAuthRoute = ({isAuthenticated, authenticationPath, ...routeProps}: ProtectedRouteProps) => {
    if(!isAuthenticated) {
        return <Route {...routeProps} />;
    } else {
        console.log(
            `ログイン済みユーザーは${authenticationPath}へはアクセスできません`,
        )
        return <Redirect to={{ pathname: '/' }} />;
    }
}

const PrivateRoute = ({isAuthenticated, authenticationPath, ...routeProps}: ProtectedRouteProps) => {
    if(isAuthenticated) {
        return <Route {...routeProps} />;
    } else {
        console.log(
            `ログインしていないユーザーは${authenticationPath}へはアクセスできません`,
        )
        return <Redirect to={{ pathname: '/sign_in' }} />;
    }
}


export const Container: React.FC = () =>{
    const signInCheck = useContext(SignInCheckContext);
    const isAuthenticated = useContext(AuthUserContext);

    const classes = useStyles();
    const isWide = useMedia({ minWidth: "760px" });
    const contentMarginLeft = isWide?170:0;

    useEffect(()=>{
        handleSignInCheck()
    } ,[signInCheck,isAuthenticated])

    return(
        <>
            <Router>
                <Header />
                <div className={classes.appBody}>
                {isWide? <SideMenu /> : <FooterMenu />}
                <div className={classes.content} style={{marginLeft:contentMarginLeft}}>
                    {signInCheck &&
                        <Switch>
                        <Route exact path = '/' component={ItemsList}/>
                        <PrivateRoute path = '/user_setting' authenticationPath="/user_setting" isAuthenticated={isAuthenticated} component={UserSetting}  />
                        <PrivateRoute exact path = '/username_setting' authenticationPath="/username_setting" isAuthenticated={isAuthenticated} component={UsernameSetting} />
                        <PrivateRoute exact path = '/avater_upload' authenticationPath="/avater_upload" isAuthenticated={isAuthenticated} component={AvaterUpload}/>
                        <PrivateRoute exact path = '/mylists' authenticationPath="/mylists" isAuthenticated={isAuthenticated} component={Mylists}/>
                        <PrivateRoute exact path = '/user_menu' authenticationPath="/user_menu" isAuthenticated={isAuthenticated} component={UserMenu}/>
                        <PrivateRoute exact path = '/mylist/show/:mylistId' authenticationPath="/mylist/show/:mylistId" isAuthenticated={isAuthenticated} component={MylistContents}/>
                        <PrivateRoute exact path = '/users/items/:userId' authenticationPath="/users/items/:userId" isAuthenticated={isAuthenticated} component={OtherUserMenu}/>
                        <UnAuthRoute exact path='/sign_in' authenticationPath="/sign_in" isAuthenticated={isAuthenticated} component={UserSignIn}/>
                        <UnAuthRoute exact path='/sign_up' authenticationPath="/sign_up" isAuthenticated={isAuthenticated} component={UserSignUp}/>
                        <UnAuthRoute exact path='/sign_up_send_mail' authenticationPath="/sign_up_send_mail" isAuthenticated={isAuthenticated} component={UserSignUpSendMail}/>
                        <UnAuthRoute exact path='/sign_up_confirm' authenticationPath="/sign_up_confirm" isAuthenticated={isAuthenticated} component={UserSignUpConfirm}/>
                        <Redirect to="/"/>
                        </Switch>
                    }
                </div>
                </div>
            </Router>
        </>
    )
}