import axios from 'axios';
import { mylistJsonUrl, mylistUrl } from '../urls';

export const getMylists = () =>{
    return axios.get(mylistJsonUrl, {
        headers:{
            "Content-Type": "application/json",
        },
        withCredentials: true
    })
    .then(res => {
        return res.data
    })
};

export const postMylists = (name: string) => {
    return axios({
        method: 'post',
        url: mylistJsonUrl,
        headers:{"Content-Type": "application/json"},
        withCredentials: true,
        data:
            {
                my_list:{
                    name:name
                }
            }
    })
    .then(res =>{
        return res.data
    })
};

export const deleteMylist = (id: string) =>{

    const deleteMylistUrl = mylistUrl + '/' + id + '.json'

    return axios({
        method: 'delete',
        url: deleteMylistUrl,
        headers:{"Content-Type": "application/json"},
        withCredentials: true,
    })
    .then(res =>{
        return res.data
    })
}