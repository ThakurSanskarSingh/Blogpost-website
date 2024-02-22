import React, { Children, useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children,authentication = true }) {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const[loader,setLoader] = useState(true)
    useEffect(()=> {
        //if the authenticaton is required and status is false redires=ct to login page
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)

    },[authStatus,authentication,navigate])

  return loader ? null /* loader component */  : <>{children}</>
}

export default Protected

// if i want to make any component protected i will wrap that component around protected so that only authenticated user will be able to 