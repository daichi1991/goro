import * as React from 'react';
import axios from 'axios';
import {defaultUrl, userUrl} from '../urls';
import { AuthUser } from '../components/molecules/types';

export const userSignIn = (email:string, password:string) =>{

    const postUserSignInUrl:string = userUrl + "/sign_in";

    return axios.post(postUserSignInUrl,{
        email: email,
        password: password
    })
    .then(res =>{
        console.log('success');
        return res;

    })
    .catch((e) => console.error(e))
};

export const userSignOut = (uid:string, accessToken:string, client:string) =>{
    const deleteUserSessionUrl:string = userUrl + "/sign_out";

    return axios.request({
        method: 'delete',
        url: deleteUserSessionUrl,
        data:{
            "uid": uid,
            "access-token": accessToken,
            "client": client,
        },
    })
    .then(res =>{
        console.log('success');
        console.log(res.data);
        return true;

    })
    .catch((e) => console.error(e))
}

export const deleteUser = () =>{
    const userToken = JSON.parse(localStorage.getItem('token')!)
    return axios.request({
        method: 'delete',
        url: userUrl,
        data:{
            "uid": userToken.uid,
            "access-token": userToken.accessToken,
            "client": userToken.client,
        },
    })
    .then(res =>{
        console.log('success');
        console.log(res.data);
        localStorage.removeItem('token');
        console.log('removeToken')
        return true;

    })
    .catch((e) => console.error(e))
}

export const changePassword = (password: string, passwordConfirm: string) =>{
    const userToken = JSON.parse(localStorage.getItem('token')!)
    const changePasswordUrl = userUrl + '/password';
    const newToken:AuthUser = {
        uid:"",
        accessToken:"",
        client:"",
    }
    return axios.patch(changePasswordUrl,{
        password:password,
        password_confirmation:passwordConfirm
    },{
        headers:{
            "Content-Type": "application/json",
            "uid": userToken.uid,
            "access-token": userToken.accessToken,
            "client": userToken.client,
        }
    })
    .then(res =>{
        newToken.uid = res.headers['uid'];
        newToken.accessToken = res.headers['access-token'];
        newToken.client = res.headers['client'];
        localStorage.setItem('token',JSON.stringify(newToken))
        return res.data
    })
    .catch((e) => console.error(e))
}

export const postPassword = (email:string) =>{
    const postPasswordUrl = userUrl + '/password';
    const resetPasswordUrl = defaultUrl + 'reset_password';
    return axios.post(postPasswordUrl,{
        email:email,
        redirect_url:resetPasswordUrl
    })
    .then(res =>{
        return res
    })
    .catch(e => {return e})
}

export const resetPassword = (password: string, passwordConfirm: string, uid:string, accessToken:string, client:string) =>{
    const changePasswordUrl = userUrl + '/password';
    const newToken:AuthUser = {
        uid:"",
        accessToken:"",
        client:"",
    }
    return axios.patch(changePasswordUrl,{
        password:password,
        password_confirmation:passwordConfirm
    },{
        headers:{
            "Content-Type": "application/json",
            "uid": uid,
            "access-token": accessToken,
            "client": client,
        }
    })
    .then(res =>{
        newToken.uid = res.headers['uid'];
        newToken.accessToken = res.headers['access-token'];
        newToken.client = res.headers['client'];
        localStorage.setItem('token',JSON.stringify(newToken))
        return res.data
    })
    .catch((e) => console.error(e))
}

export const resetPasswordNoSignIn = (password: string, passwordConfirm: string, uid:string, accessToken:string, client:string) =>{
    const changePasswordUrl = userUrl + '/password';
    const newToken:AuthUser = {
        uid:"",
        accessToken:"",
        client:"",
    }
    return axios.patch(changePasswordUrl,{
        password:password,
        password_confirmation:passwordConfirm
    },{
        headers:{
            "Content-Type": "application/json",
            "uid": uid,
            "access-token": accessToken,
            "client": client,
        }
    })
    .then(res =>{
        return res.data
    })
    .catch((e) => console.error(e))
}