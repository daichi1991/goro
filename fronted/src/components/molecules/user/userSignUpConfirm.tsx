import axios from 'axios';
import * as React from 'react';
import { useSignUpConfirm } from '../../../contexts/authUserContext';
import { userUrl } from '../../../urls';
import * as H from 'history';

const {useEffect, useContext,useState} = React;

interface Props {
    history: H.History;
}

export const UserSignUpConfirm:React.FC<Props> = (props:Props) =>{
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const confirmationToken = params.get('confirmation_token');
    const [success, setSuccess] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("");

    const signUpConfirm =(confirmationToken:string|null) => {
        const getUserConfirmUrl = userUrl + "/confirmation?confirmation_token=" + confirmationToken
        axios.get(
            getUserConfirmUrl
            )
            .then(res=>{
                console.log(res);
                if(res.status === 200){
                    setStatus('scucess');

                }else{
                    setStatus('fail');
                }
                return res.data;
            })
            .catch((e)=>{
                setStatus('fail');
                return e;
            })
    };

    useEffect(() =>{
        const response = signUpConfirm(confirmationToken);
        console.log(confirmationToken);
        console.log(response);
    },[])

    return(
        <>
            <h1>ユーザー認証</h1>
            {status===''?
                <h3>認証確認中</h3>:
                status==='success'?
                <h3>認証成功</h3>:
                <h3>認証失敗</h3>
            }
            {status===''?
                <p>少々お待ちください</p>:
                status==='success'?
                <p>ログインしてください</p>:
                <p>ユーザー登録をやり直してください</p>
            }
        </>
    )
}