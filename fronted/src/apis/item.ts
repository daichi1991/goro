import axios from 'axios';
import { itemUrl, itemJsonUrl } from '../urls';

export const getItems = () =>{
    return axios.get(itemJsonUrl,{
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then(res =>{
        return res.data
    })
};

export const getMyItems = () =>{
    const myItemUrl = itemUrl + '/user_index.json';
    return axios.get(myItemUrl,{
        headers:{
            "Content-Type": "application/json",
        }, withCredentials: true 
    })
    .then(res =>{
        return res.data
    })
};

export const postItems = (title:string, year:number, year_type:string, goro_text:string, description:string) =>{
    return axios({
        method: 'post',
        url: itemJsonUrl,
        headers:{"Content-Type": "application/json"},
        withCredentials: true,
        data:
            {item:{
                title:title,
                year:year,
                year_type:year_type,
                goro_text:goro_text,
                description:description
                }
            }
    })
    .then(res=>{
        return res.data
    })
};