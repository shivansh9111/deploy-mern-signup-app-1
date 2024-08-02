
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from "./pages/Login.jsx";
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import { useState } from 'react';
import Refreshhandler from './Refreshhandler.jsx';


function App() {

  const[isAuthenticated, setIsauthenticated]=useState(false) ;
  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to="/login"/>
  }
 
  return (
    <div className='app'>
    <Refreshhandler setIsauthenticated={setIsauthenticated}/>
   <Routes>
    <Route path='/' element={<Navigate to="/login"/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
    
  </Routes>
  </div>
  )
}

export  default App
