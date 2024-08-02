import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Login() {
const[loginInfo,setLoginInfo]= useState({
  email:"",
  password:""
})

const Navigate =useNavigate()

const handleChange=(e)=>{
 const{name,value}=e.target
 console.log(name,value);
 const copyLoginInfo={...loginInfo}
 copyLoginInfo[name]=value;
 setLoginInfo(copyLoginInfo)
console.log('logininfo>>>',loginInfo);
} 


const handleLogin= async (e) => {
  e.preventDefault();
const{email,password,}=loginInfo
if(!email || !password) {
  return handleError('email and password are required')
}
try {
  const url = 'http://localhost:8080/auth/login'
  const response = await fetch(url,{
    method:'POST',
    headers:{'Content-type':'application/json'},
    body: JSON.stringify(loginInfo)
  });

  const result = await response.json();
  const {success,message,error,jwtToken,name}=result;
  if(success){
    handleSuccess(message)
    localStorage.setItem('token',jwtToken)
    localStorage.setItem('loggedinUser',name)
    setTimeout(() => {
      Navigate('/home')
    }, 1000);
  } 
  else if (error){
   const details = error?.deatils[0].message;
   handleError(details)
  }
 else if (!success){
  handleError(message)
 }
 
}
 catch (error) {
  handleError(error)
}
}


  return (
    <div className='container'>
      
      <h1>Login</h1>
      
      <form onSubmit={handleLogin}>
       <div>
        <label htmlFor="email">Email</label>
        <input 
        onChange={handleChange}
        type="email"
        name='email'
        placeholder='enter your email'
        value={loginInfo.email}
        />
       </div>

       <div>
        <label htmlFor="password">Password</label>
        <input
        onChange={handleChange}
        type="password"
        name='password'
        placeholder='password'
        value={loginInfo.password}
        />
        
       </div>
       <div>
       <button type='submit'>Login</button>
        <span> register
          <Link to={'/signup'}>Signup</Link>
        </span>
        </div>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login