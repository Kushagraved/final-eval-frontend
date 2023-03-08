import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import propTypes from 'prop-types'

export const LoadingContext = createContext({})

export const useLoading = () => {
  return useContext(LoadingContext)
}

const LoadingContextProvider = ({children }) => {

  const [loading, setLoading] = useState(false);
  
  const showLoading = () => {
    setLoading(true);
  }
  const hideLoading = () => {
    setLoading(false);
  }

  return (
    <LoadingContext.Provider value={{showLoading,hideLoading,loading }}>
      {children}
    </LoadingContext.Provider>
  )
}

LoadingContextProvider.propTypes = {
  children: propTypes.node.isRequired
}

export default LoadingContextProvider