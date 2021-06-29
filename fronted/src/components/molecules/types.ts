export type AuthUser = {
    token:string
}

export type ItemType =
    {
        id:string,
        user_id:string,
        title:string,
        year:number,
        year_type:string,
        goro_text:string,
        description:string        
    };

export type MylistType =
    {
        id:string,
        user_id:string,
        name:string
    }

export type MylistContentsType =
    {
        id:string,
        name:string,
        items?:MylistItemType[]
        
    }

export type MylistItemType = {
    item_mylist_id:string,
    id:string,
    title:string,
    year:number,
    year_type:string,
    goro_text:string,
    description:string
}