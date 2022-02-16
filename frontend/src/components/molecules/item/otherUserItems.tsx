import { Avatar } from '@material-ui/core'
import PersonIcon from '@mui/icons-material/Person'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { getUserItems } from '../../../apis/item'
import { getProfile } from '../../../apis/user'
import { MyItemsContext } from '../../../contexts/itemsContexts'
import { ItemType } from '../types'
import { ItemsWrapper } from './itemsWrapper'

const { useContext, useEffect, useState } = React

export const OtherUserMenu: React.FC = () => {
  const params: { userId: string } = useParams()

  const { myItemsState, setMyItems } = useContext(MyItemsContext)

  const [avaterImageUrl, setAvaterImageUrl] = useState<string>('')

  const getProfileImage = async () => {
    const profile = await getProfile(params.userId)
    setAvaterImageUrl(profile.image.url)
  }

  useEffect(() => {
    if (params.userId) {
      getProfileImage()
      getUserItems(params.userId).then(
        (data: React.SetStateAction<ItemType[]>) => {
          setMyItems(data)
        },
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {avaterImageUrl ? (
        <Avatar alt="g" src={avaterImageUrl} />
      ) : (
        <Avatar>
          <PersonIcon />
        </Avatar>
      )}
      <h3>アイテムリスト</h3>
      {myItemsState.map((myItem, index) => (
        <ItemsWrapper key={index} item={myItem} />
      ))}
    </>
  )
}
