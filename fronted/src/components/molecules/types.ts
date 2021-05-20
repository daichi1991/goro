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