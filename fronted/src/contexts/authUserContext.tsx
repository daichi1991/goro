import * as React from 'react';
import PropTypes from 'prop-types';
import {AuthUser} from '../components/molecules/types';

const {createContext, useContext, useState, useEffect} = React;

type OperationType = {
    handleSetAuthUser:(token:AuthUser) => void;
    deleteAuthUser:() => void;
}

export const AuthUserContext = createContext<AuthUser | null>(null);
export const SignInErrorContext = createContext<boolean>(false);

const AuthOperationContext = createContext<OperationType>({
    handleSetAuthUser: () => console.error("Proveiderが設定されていません"),
    deleteAuthUser: () => console.error("Proveiderが設定されていません")
})


const AuthUserProvider: React.FC = (children) =>{
    const [authUser, setAuthUser] = useState<AuthUser | null>(null)
    const [signInError, setSignInError] = useState<boolean>(false);

    const handleSetAuthUser = (token:AuthUser) =>{
        setAuthUser(token);
    }

    const deleteAuthUser = () =>{
        setAuthUser(null);
        console.log('setAuthUser => null')
    }

    return (
        <AuthOperationContext.Provider value={{handleSetAuthUser,deleteAuthUser}}>
            <AuthUserContext.Provider value={authUser}>
                <SignInErrorContext.Provider value={signInError}>
                    {children}
                </SignInErrorContext.Provider>
            </AuthUserContext.Provider>
        </AuthOperationContext.Provider>
    )
};

AuthUserProvider.propTypes ={
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]).isRequired,
    type: PropTypes.string,
};

export const useAuthUser = () => useContext(AuthUserContext)
export const useHandleSetAuthUser = (token:AuthUser) => useContext(AuthOperationContext).handleSetAuthUser
export const useDeleteAuthUser = () => useContext(AuthOperationContext).deleteAuthUser

export default AuthUserProvider
