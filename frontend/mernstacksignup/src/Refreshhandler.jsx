import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


function Refreshhandler({setIsauthenticated}) {
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
if(localStorage.getItem('token')){
  setIsauthenticated(true)
if(location.pathname === '/' || location.pathname === "/login" || location.pathname === '/signup'){
  navigate('/home',{replace: false})
}
}
  },[location,navigate,setIsauthenticated])

  return (null 

  )
}

export default Refreshhandler