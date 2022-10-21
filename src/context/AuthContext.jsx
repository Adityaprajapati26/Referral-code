import React,{ createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext=createContext()
export const Authprovider=({children})=>{
    const[isAuth,setAuth]=useState(false)
    const navigate=useNavigate()
    const login=()=>{
      setAuth(true)
    }
    const logout=()=>{
        setAuth(false)
    }

    return <AuthContext.Provider value={{isAuth,login,logout}}>{children}</AuthContext.Provider>
}