const mode = process.env.REACT_APP_MODE

const HOST = mode === 'TEST' ? 'http://localhost:3000/' : 'https://goro-backend.herokuapp.com'

const DEFAULT_URL = `${HOST}/api/v1`

export const userUrl = `${DEFAULT_URL}/auth`

export const frontUrl = mode === 'TEST'?'http://localhost:3001/':'https://goro-frontend.herokuapp.com/'

export const itemJsonUrl = `${DEFAULT_URL}/items.json`

export const itemUrl = `${DEFAULT_URL}/items`

export const mylistUrl = `${DEFAULT_URL}/my_lists`

export const mylistJsonUrl = `${DEFAULT_URL}/my_lists.json`

export const itemMylistUrl = `${DEFAULT_URL}/item_mylists`

export const itemMylistJsonUrl = `${DEFAULT_URL}/item_mylists.json`

export const imageUploadUrl = `${DEFAULT_URL}/profiles/upload_image`

export const profileUrl = `${DEFAULT_URL}/profiles.json`

export const getProfileIdUrl = `${DEFAULT_URL}/profiles/get_profile_id.json`

export const myProfileUrl = `${DEFAULT_URL}/profiles/my_profile.json`

export const currentUserUrl = `${DEFAULT_URL}/users/current_user_show.json`

export const userInfoUrl = `${DEFAULT_URL}/users/`
