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
                    item_id:itemId,
                    memory_level:0
                }
            }
    })
    .then(res =>{
        return res.data
    })
};

export const patchItemMylists = (itemMylistId:string, mylistId:string, itemId:string, memoryLevel:number ) => {
    const patchItemMylistUrl = itemMylistUrl + '/' + itemMylistId + '.json'

    return axios({
        method: 'patch',
        url: patchItemMylistUrl,
        headers:{"Content-Type": "application/json"},
        withCredentials: true,
        data:
            {
                item_mylist:{
                    my_list_id:mylistId,
                    item_id:itemId,
                    memory_level:memoryLevel
                }
            }
    })
    .then(res =>{
        return res.data
    })
};

export const deleteItemMylist = (itemMylistId:string) =>{

    const deleteItemMylistUrl = itemMylistUrl + '/' + itemMylistId + '.json';

    return axios({
        method: 'delete',
        url: deleteItemMylistUrl,
        headers:{"Content-Type": "application/json"},
        withCredentials: true,
    })
    .then(res =>{
        return res.data
    })
}