import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils'
import { ToastContainer } from 'react-toastify'
function Home() {
const[loggedinUser,setLoggedInUser]= useState('')

const[products,setProducts]=useState([''])

const navigate = useNavigate()

const handleLogout = (e)=>{
  localStorage.removeItem('token');
  localStorage.removeItem('loggedinUser');
  handleSuccess('user logout succesfully')
  setTimeout(()=>{
   navigate('/login')
  },1000)
}

useEffect(()=>{
setLoggedInUser(localStorage.getItem('loggedinUser'))
},[])


const fetchproducts = async ()=>{
  try {
    const url= 'https://deploy-mern-signup-app-1-api.vercel.app/products';
    const headers = {
      headers: {'Authorization':localStorage.getItem('token')}
    }
    const response = await fetch(url, headers)
    const result =await response.json()
    console.log(result)
    setProducts(result)

  } catch (error) {
    handleError(error)
  }
}
useEffect(()=>{
 fetchproducts()
}, [])

  return (
    <div>
      <h1>welcome {loggedinUser}</h1>
      <span></span>
      <button onClick={handleLogout}>Logout</button>
     <div>
      {
        products?.map((item, index)=>(
         <ul key={index}>
      <span>{item.name}:{item.price}</span>
     </ul>
       ))
     }
     </div>
      <ToastContainer/>
      </div>
      
    
  )
}

export default Home