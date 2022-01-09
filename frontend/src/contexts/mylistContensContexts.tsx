import PropTypes from 'prop-types'
import * as React from 'react'
import { MylistContentsType } from '../components/molecules/types'

const { useState } = React

export const MylistContentsContext = React.createContext(
  {} as {
    mylistContentsState: MylistContentsType
    setMylistContents: React.Dispatch<React.SetStateAction<MylistContentsType>>
  },
)

const MylistContentsProvider: React.FC = (children) => {
  const [mylistContentsState, setMylistContents] = useState<MylistContentsType>(
    { id: '', name: '' },
  )

  return (
    <MylistContentsContext.Provider
      value={{ mylistContentsState, setMylistContents }}
    >
      {children.children}
    </MylistContentsContext.Provider>
  )
}

MylistContentsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  type: PropTypes.string,
}

export default MylistContentsProvider
