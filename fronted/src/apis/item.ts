import axios from 'axios';
import { itemUrl } from '../urls';

export const getItems = () =>{
    return axios.get(itemUrl,{
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then(res =>{
        return res.data
    })
}

export const getMyItems = () =>{
    const myItemUrl = itemUrl + 'user_item';
    return axios.get(myItemUrl,{
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then(res =>{
        return res.data
    })
}