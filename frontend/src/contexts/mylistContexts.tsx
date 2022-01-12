import axios from 'axios'
import PropTypes from 'prop-types'
import * as React from 'react'
import { getMylists } from '../apis/mylist'
import { MylistType } from '../components/molecules/types'
import { mylistUrl } from '../utils/urls'

const { useEffect, useState, createContext } = React

export const MylistsContext = createContext(
  {} as {
    mylistsState: MylistType[]
    setMylists: React.Dispatch<React.SetStateAction<MylistType[]>>
  },
)

type OperationType = {
  putMylist: (id: string, name: string) => void
}

export const MylistOperationContext = createContext<OperationType>({
  putMylist: () => console.error('Proveiderが設定されていません'),
})

const MylistsProvider: React.FC = (children) => {
  const [mylistsState, setMylists] = useState<MylistType[]>([])

  const putMylist = (id: string, name: string) => {
    const putMylistUrl = mylistUrl + '/' + id + '.json'
    return axios({
      method: 'put',
      url: putMylistUrl,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      data: {
        name: name,
      },
    }).then((res) => {
      return res.data
    })
  }

  useEffect(() => {
    getMylists().then((data: React.SetStateAction<MylistType[]>) => {
      setMylists(data)
    })
  }, [])

  return (
    <MylistOperationContext.Provider value={{ putMylist }}>
      <MylistsContext.Provider value={{ mylistsState, setMylists }}>
        {children.children}
      </MylistsContext.Provider>
    </MylistOperationContext.Provider>
  )
}

MylistsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  type: PropTypes.string,
}

export default MylistsProvider
