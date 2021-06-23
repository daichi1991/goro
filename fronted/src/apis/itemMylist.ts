import axios from 'axios';
import { itemMylistJsonUrl, itemMylistUrl ,mylistUrl} from '../urls';

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

export const getItemMylistsIndex = (mylistId:string) =>{

    const mylistIndexUrl = itemMylistUrl + '/mylist_index.json'

    return axios({
        method: 'get',
        url: mylistIndexUrl,
        headers:{"Content-Type": "application/json"},
        withCredentials: true,
        params:
            {
                "my_list_id":mylistId
            }
    })
    .then(res => {
        return res.data
    })
};

export const getItemMylistShow = (mylistId:string) =>{

    const mylistShowUrl = mylistUrl + '/' + mylistId + '.json';

    return axios({
        method: 'get',
        url: mylistShowUrl,
        headers:{"Content-Type": "application/json"},
        withCredentials: true,
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