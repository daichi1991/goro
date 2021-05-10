import * as React from 'react';
import axios from 'axios';
import * as H from 'history';
import {userUrl} from '../../../urls';
import { Link } from 'react-router-dom';
import { useSignUp } from '../../../contexts/authUserContext';
import { LinkButton,linkStyle, StyledInput, StyleSubmit, tableStyle }from '../../../components/atoms/styles';


const {useState} = React;

interface Props {
    history: H.History
}

export const UserSignUp:React.FC<Props> = (props: Props) =>{

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const signUp = useSignUp(email, password);

    const userSignUp = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(passwordConfirm);
        signUp(email, password, passwordConfirm);
        props.history.replace("/sign_up_send_mail")
        

        // const postUserSignUpUrl:string = userUrl;

        // return axios.post(postUserSignUpUrl,{
        //     email: email,
        //     password: password
        // })
        // .then(res =>{
        //     props.history.replace("/");
        //     return res;
        // })
        // .catch((e) => console.error(e))

    };

    const handleEmail = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(event.target.value);
    }

    const handlePassword = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(event.target.value);
    }

    const handlePasswordConfirm = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setPasswordConfirm(event.target.value);
    }

    return(
        <>
            <h3>ユーザー登録</h3>

            <form onSubmit={e => userSignUp(e)}>
                <table style={tableStyle}>
                    <tr>
                        <td>
                            メールアドレス
                        </td>
                        <td>
                            <StyledInput type="text" value={email} onChange={handleEmail}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            パスワード
                        </td>
                        <td>
                            <StyledInput type="password" value={password} onChange={handlePassword}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            パスワード確認
                        </td>
                        <td>
                            <StyledInput type="password" value={passwordConfirm} onChange={handlePasswordConfirm}/>
                        </td>
                    </tr>
                </table>
                {password===passwordConfirm?
                <StyleSubmit type="submit" value="登録" />:
                <StyleSubmit type="submit" value="登録" disabled/>
                }
            </form>
            
            <Link to="/sign_in" style={linkStyle}>
                <LinkButton>
                    ログイン画面へ
                </LinkButton>
            </Link>
        </>
    )
}