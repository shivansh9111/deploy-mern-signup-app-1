import React, { useState } from 'react'
import {ToastContainer} from "react-toastify"
import {Link, useNavigate} from "react-router-dom"
import { handleError, handleSuccess } from '../utils'
function Signup() {

const [signupInfo,setsignupInfo]= useState({
  name:"",
  email:"",
  password:""
})

const navigate = useNavigate()

  const handleChange = (e)=>{
   const{name,value}=e.target;
   console.log(name,value);
   const copysignupInfo = {...signupInfo};
   copysignupInfo[name]=value;
    setsignupInfo(copysignupInfo);}
  console.log('signupinfo>>', signupInfo);


  const handleSignup = async(e)=>{
    e.preventDefault();
    const{name,email,password}=signupInfo
    if(!name || !email || !password){
     return handleError("all fields are required")
    } 
    try {
      const url="https://deploy-mern-signup-app-1-api.vercel.app/auth/signup";
      const response = await fetch(url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const{success,message,error}=result;
     if(success){
      handleSuccess(message);
      setTimeout(()=>{
      navigate('/login')
      },1000)
     
     }
     else if (error){
      const details = error?.details[0].message ;
      handleError(details)
     }
     else if(!success){
      handleError(message)
     }
    }  catch (error) {
      handleError(error)
    }
  }
  return (
    <div className='container'>
      <h1 >Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name"> Name</label>
          <input 
          onChange={handleChange}
          type="text"
           name='name'
           autoFocus
           placeholder='enter your name'
           value={signupInfo.name}
          />
          <div>
          <label htmlFor="email">Email</label>
          <input 
           onChange={handleChange}
          type="email" 
          name='email'
          placeholder='enter your valid email adress'
          value={signupInfo.email}
          />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input 
             onChange={handleChange}
            type="password" 
            name='password' 
            placeholder='enter your password'
            value={signupInfo.password}
            />
          </div>
          <button  type="submit">Signup</button>
          <span>already have an account ? 
            <Link to={'/login'}>Login</Link>
          </span> 
            
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup

