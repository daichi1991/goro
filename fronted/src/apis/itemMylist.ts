import axios from 'axios';
import { itemMylistJsonUrl, itemMylistUrl } from '../urls';

export const getItemMylists = () =>{
    return axios.get(itemMylistJsonUrl, {
        headers:{
            "Content-Type": "application/json",
        },
        withCredentials: true
    })
    .then(res => {
        return res.data
    })
};

export const postItemMylists = (mylistId:string, itemId:string ) => {
    return axios({
        method: 'post',
        url: itemMylistJsonUrl,
        headers:{"Content-Type": "application/json"},
        withCredentials: true,
        data:
            {
                item_mylist:{
                    my_list_id:mylistId,
                    item_id:itemId
                }
            }
    })
    .then(res =>{
        return res.data
    })
};