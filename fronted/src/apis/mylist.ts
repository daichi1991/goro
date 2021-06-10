import axios from 'axios';
import { mylistUrl } from '../urls';

export const getMylists = () =>{
    return axios.get(mylistUrl, {
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then(res => {
        return res.data
    })
};

export const postMylists = (name: string) => {
    return axios({
        method: 'post',
        url: mylistUrl,
        headers:{"Content-Type": "application/json"},
        withCredentials: true,
        data:
            {
                mylist:{
                    name:name
                }
            }
    })
    .then(res =>{
        return res.data
    })
};