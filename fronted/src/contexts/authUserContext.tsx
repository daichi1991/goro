import * as React from 'react';

import axios from 'axios';
import { userUrl, defaultUrl, itemUrl } from '../urls';
import {AuthUser} from '../components/molecules/types';

const {createContext, useContext, useState, useEffect} = React;

type OperationType = {
    handleSetAuthUser:(token:AuthUser) => void;
    deleteAuthUser:() => void;
    signUp:(email:string, password:string, passwordConfirm:string) => void;
    signUpConfirm :(token:string|null) => void;
    signIn:(email:string, password:string) => void;
    signOut:() => void;
    signInCheck:() => void;
}

export const AuthUserContext = createContext<AuthUser | null>(null);
export const SignInErrorContext = createContext<boolean>(false);

const AuthOperationContext = createContext<OperationType>({
    handleSetAuthUser: () => console.error("Proveiderが設定されていません"),
    deleteAuthUser: () => console.error("Proveiderが設定されていません"),
    signUp: () => console.error("Proveiderが設定されていません"),
    signUpConfirm: () => console.error("Proveiderが設定されていません"),
    signIn: () => console.error("Proveiderが設定されていません"),
    signOut:() => console.error("Providerが設定されていません"),
    signInCheck: () => console.error("signInCheckのProviderが設定されていません")
})


const AuthUserProvider: React.FC = (children) =>{
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);
    const [signInError, setSignInError] = useState<boolean>(false);
    const signInUrl = defaultUrl + 'sign_in';

    const userToken:AuthUser= {
        uid:"",
        accessToken:"",
        client:"",
    };

    const postUserSignInUrl:string = userUrl + "/sign_in";

    const handleSetAuthUser = (token:AuthUser) =>{
        setAuthUser(token);
    };

    const deleteAuthUser = () =>{
        setAuthUser(null);
        console.log('setAuthUser => null')
    };


    const signUp = (email:string, password:string, passwordConfirm: string) => axios.post(userUrl,{
        user: {
            email: email,
            password: password,
            password_confirmation: passwordConfirm,
        }
    },{
        headers:{'Content-Type':'application/json'}
    })
    .then(res =>{
        return res;
    })


    const signUpConfirm =(confirmationToken:string|null) => {
        const getUserConfirmUrl = userUrl + "/confirmation?confirmation_token=" + confirmationToken
        axios.get(
            getUserConfirmUrl
            )
            .then(res=>{
                console.log(res);
                return res.data;
            })
            .catch((e)=>{
                return e;
            })
    };

    const signIn = (email:string, password:string) => axios.post(postUserSignInUrl,
        {
        user:{
            email: email,
            password: password
        }
    },{ 
        withCredentials: true
    })
    .then(res =>{
        setSignInError(false);
    })
    .then(res =>{
        setAuthUser(userToken);
        return res;
    })
    .catch((e) => 
        {
            console.error(e)
            setSignInError(true);
        })


    const signOut = () =>{
        const deleteUserSessionUrl:string = userUrl + "/sign_out";
        const userToken = localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')!):null

        return axios.delete(deleteUserSessionUrl,
            {data:{
                "uid": userToken.uid,
                "access-token": userToken.accessToken,
                "client": userToken.client,
            }
            })
        .then(res =>{
            setAuthUser(null);
            localStorage.removeItem('token');
            return res;
    
        })
        .catch((e) => console.error(e))
    }

    const signInCheck = () =>{
        const tempAuthUser = JSON.parse(localStorage.getItem('token')!)
        return(
            tempAuthUser?
                axios.get(itemUrl,{
                    headers: { 
                        "Content-Type": "application/json",
                        "uid": tempAuthUser.uid,
                        "access-token": tempAuthUser.accessToken,
                        "client": tempAuthUser.client,
                    }
                })
                .then(res => {
                    setAuthUser(tempAuthUser);
                })
                .catch(() => {
                    localStorage.removeItem('token')
                    console.log("ログアウトしました")
                })
            :console.log("tokenなし")
        )
    }

    useEffect(()=>{
        signInCheck()
    } ,[])

    return (
        <AuthOperationContext.Provider value={{handleSetAuthUser,deleteAuthUser,signUp,signUpConfirm, signIn,signOut,signInCheck}}>
            <AuthUserContext.Provider value={authUser}>
                <SignInErrorContext.Provider value={signInError}>
                    {children.children}
                </SignInErrorContext.Provider>
            </AuthUserContext.Provider>
        </AuthOperationContext.Provider>
    )
};

export const useAuthUser = () => useContext(AuthUserContext)
export const useHandleSetAuthUser = (token:AuthUser) => useContext(AuthOperationContext).handleSetAuthUser
export const useDeleteAuthUser = () => useContext(AuthOperationContext).deleteAuthUser
export const useSignUp = (email:string, password:string) => useContext(AuthOperationContext).signUp
export const useSignUpConfirm = (token:string|null) => useContext(AuthOperationContext).signUpConfirm
export const useSignIn = (email:string, password:string) => useContext(AuthOperationContext).signIn
export const useSignOut = () => useContext(AuthOperationContext).signOut
export const useSignInCheck = () => useContext(AuthOperationContext).signInCheck

export default AuthUserProvider
