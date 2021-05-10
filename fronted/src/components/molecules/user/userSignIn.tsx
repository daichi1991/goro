import * as React from 'react';
import * as H from 'history';
import { Link } from 'react-router-dom';
import { useSignIn, SignInErrorContext } from '../../../contexts/authUserContext';
import { LinkButton,linkStyle, StyledInput, StyleSubmit, tableStyle }from '../../../components/atoms/styles';

const {useState, useContext} = React;

interface Props {
    history: H.History;
}

export const UserSignIn:React.FC<Props> = (props: Props) =>{


    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const signIn = useSignIn(email, password);
    const signInCheck = useContext(SignInErrorContext)

    const userSignIn = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        signIn(email, password);
    };

    const handleEmail = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(event.target.value);
    }

    const handlePassword = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(event.target.value);
    }

    const accountConfirmCheck = () =>{
        const confirmParam = window.location.search;
        if(confirmParam === '?account_confirmation_success=true'){
            return true;
        }
        return false;
    }

    return(
        <>
            {
                accountConfirmCheck()?<h2>認証が成功しました</h2>:<span></span>
            }
            <h3>ログイン</h3>
            {
                signInCheck?<p style={{color:"red"}}>メールアドレスないしパスワードが正しくありません</p>:<span></span>
            }
            <form onSubmit={e => userSignIn(e)}>
                <table style={tableStyle}>
                    <tbody>
                        <tr>
                            <td>
                                メールアドレス
                            </td>
                            <td>
                                <StyledInput type="text" value={email} onChange={handleEmail}/>
                            </td>
                        </tr>
                        <tr>
                            <td>パスワード</td>
                            <td><StyledInput type="password" value={password} onChange={handlePassword}/></td>
                        </tr>
                    </tbody>    
                </table>
                <StyleSubmit type="submit" value="ログイン"/>
            </form>
            <Link to="/sign_up" style={linkStyle}>
                <LinkButton>
                    ユーザ登録画面へ
                </LinkButton>
            </Link>
            <Link to="/reset_password_confirm">
                パスワードをお忘れですか？
            </Link>
        </>
    )
}