import React from 'react'
import {Navigate} from 'react-router-dom'
import proTypes from 'prop-types'

//register,login(Public Routes)
const PublicRoute = (props) => {
    
    //if user logged in
    if(localStorage.getItem('token')){
        return <Navigate to='/'/>;
    }
    else{
        return props.children;
    }
}

PublicRoute.propTypes = {
    children: proTypes.node.isRequired
}

export default PublicRoute
