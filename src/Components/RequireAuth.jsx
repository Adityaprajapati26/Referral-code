import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const RequireAuth = ({children}) => {
    const {isAuth}=useContext(AuthContext)
    const{pathname}=useLocation()
    console.log(pathname)
    console.log(isAuth)
    console.log(children)
    if(isAuth)
    {
        return children
    }
    else{
        return <Navigate to='/Login' state={{from:pathname}}/>
    }
  
}

export default RequireAuth