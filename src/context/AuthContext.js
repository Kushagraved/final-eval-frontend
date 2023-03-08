import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import propTypes from 'prop-types'

export const AuthContext = createContext({})

export const useUser = () => {
  return useContext(AuthContext)
}


const AuthContextProvider = ({children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{user,setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: propTypes.node.isRequired
}
export default AuthContextProvider