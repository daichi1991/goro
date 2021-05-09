export type AuthUser = {
    uid:string,
    accessToken:string,
    client:string,
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