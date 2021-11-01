import * as React from 'react';

import axios from 'axios';
import { userUrl, defaultUrl, itemUrl, profileUrl, myProfileUrl, currentUserUrl, userInfoUrl } from '../urls';
import {AuthUser, UserType} from '../components/molecules/types';

const {createContext, useContext, useState, useEffect} = React;

type OperationType = {
    handleSetAuthUser:(token:AuthUser) => void;
    deleteAuthUser:() => void;
    signUp:(email:string, password:string, passwordConfirm:string) => void;
    signUpConfirm :(token:string|null) => void;
    signIn:(email:string, password:string) => void;
    signOut:() => void;
    signInCheck:() => void;
    postUserInfo:(id:string, username:string) => boolean;
}

export const AuthUserContext = createContext<boolean>(false);
export const MyProfileIdContext = createContext<string>('');
export const SignInErrorContext = createContext<boolean>(false);
export const UserInfoContext = createContext<UserType>({id:'',username:''});

const AuthOperationContext = createContext<OperationType>({
    handleSetAuthUser: () => console.error("Proveiderが設定されていません"),
    deleteAuthUser: () => console.error("Proveiderが設定されていません"),
    signUp: () => console.error("Proveiderが設定されていません"),
    signUpConfirm: () => console.error("Proveiderが設定されていません"),
    signIn: () => console.error("Proveiderが設定されていません"),
    signOut:() => console.error("Providerが設定されていません"),
    signInCheck: () => console.error("signInCheckのProviderが設定されていません"),
    postUserInfo: () => false,
})


const AuthUserProvider: React.FC = (children) =>{
    const [authUser, setAuthUser] = useState<boolean>(false);
    const [signInError, setSignInError] = useState<boolean>(false);
    const [myProfileId, setMyProfileId] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserType>({id:'',username:''});
    const [userInfoSuccess, setUserInfoSuccess] = useState<boolean>(false);
    const signInUrl = defaultUrl + 'sign_in';

    const userToken:AuthUser= {
        token:"",
    };

    const postUserSignInUrl:string = userUrl + "/sign_in";

    const handleSetAuthUser = () =>{
        setAuthUser(true);
    };

    const deleteAuthUser = () =>{
        setAuthUser(false);
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
        userToken.token = 'nowSignIn'
        setAuthUser(true);
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
            setAuthUser(false);
            localStorage.removeItem('token');
            return res;
    
        })
        .catch((e) => console.error(e))
    }

    const signInCheck = () =>{
        const myItemUrl = itemUrl + '/user_index.json';
        return axios.get(myItemUrl,{
            headers:{
                "Content-Type": "application/json",
            }, withCredentials: true 
        })
        .then(() =>{
            setAuthUser(true);
        })
        .catch(() =>{
            setAuthUser(false);
        }
        )
    }

    const getMyProfile = () =>{
        axios.get(myProfileUrl,{
            headers:{
                "Content-Type": "application/json",
            }, withCredentials: true 
        })
        .then(res =>{
            setMyProfileId(res.data.id);
        })
    }

    const getUserInfo = () =>{
        axios.get(currentUserUrl,{
            headers:{
                "Content-Type": "application/json",
            }, withCredentials: true 
        })
        .then(res =>{
            setUserInfo({id:res.data.id,username:res.data.username});
        })
    }

    const postUserInfo = (id:string, username:string) =>{
        const postUserUrl = userInfoUrl + id +'.json';
        axios.put(postUserUrl,{
            user:{
                id:id,
                username:username
            }
        },{
            headers:{
                'Content-Type':'application/json',
        }, withCredentials: true 
        })
        .then(() =>{
            setUserInfoSuccess(true);
        })
        .catch(() => {
            setUserInfoSuccess(false);
        })
        return(userInfoSuccess);
    }

    useEffect(()=>{
        signInCheck();
        getMyProfile();
        getUserInfo();
    } ,[])

    return (
        <AuthOperationContext.Provider value={{handleSetAuthUser,deleteAuthUser,signUp,signUpConfirm, signIn,signOut,signInCheck,postUserInfo}}>
            <AuthUserContext.Provider value={authUser}>
                <MyProfileIdContext.Provider value={myProfileId}>
                    <UserInfoContext.Provider value={userInfo}>
                        <SignInErrorContext.Provider value={signInError}>
                            {children.children}
                        </SignInErrorContext.Provider>
                    </UserInfoContext.Provider>    
                </MyProfileIdContext.Provider>
            </AuthUserContext.Provider>
        </AuthOperationContext.Provider>
    )
};

export const useAuthUser = () => useContext(AuthUserContext)
export const useMyProfileId = () => useContext(MyProfileIdContext)
export const useUserInfo = () => useContext(UserInfoContext)
export const usePostUserInfo = (id:string, username:string) => useContext(AuthOperationContext).postUserInfo
export const useHandleSetAuthUser = (token:AuthUser) => useContext(AuthOperationContext).handleSetAuthUser
export const useDeleteAuthUser = () => useContext(AuthOperationContext).deleteAuthUser
export const useSignUp = (email:string, password:string) => useContext(AuthOperationContext).signUp
export const useSignUpConfirm = (token:string|null) => useContext(AuthOperationContext).signUpConfirm
export const useSignIn = (email:string, password:string) => useContext(AuthOperationContext).signIn
export const useSignOut = () => useContext(AuthOperationContext).signOut
export const useSignInCheck = () => useContext(AuthOperationContext).signInCheck

export default AuthUserProvider
