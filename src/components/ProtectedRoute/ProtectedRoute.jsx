import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useUser } from '../../context/AuthContext'
import makeRequest from '../../utils/makeRequest'
import { GET_USER } from '../../constants/apiEndPoints'
import { useLoading } from '../../context/LoadingContext'
import propTypes from 'prop-types'


const ProtectedRoute = (props) => {
  const { user, setUser } = useUser()
  const { showLoading, hideLoading } = useLoading()
  const navigate = useNavigate()
  const getUser = async () => {
    try {
      showLoading()

      const res = await makeRequest(GET_USER, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      hideLoading()
      console.log(res)
      if (res.success) {
        setUser(res.user)
      } else {
        localStorage.clear()
        navigate('/auth')
      }
    } catch (error) {
      console.log(error)
      hideLoading()
      localStorage.clear()
      navigate('/auth')
    }
  }
  useEffect(() => {
    if (!user) {
      getUser()
    }
  }, [user])

  //if user logged in
  if (localStorage.getItem('token')) {
    return props.children
  } else {
    return <Navigate to='/auth' />
  }
}

ProtectedRoute.propTypes = {
  children: propTypes.node,
}

export default ProtectedRoute
