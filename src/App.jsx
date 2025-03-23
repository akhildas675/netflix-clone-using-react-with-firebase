import React, { useEffect } from "react"
import { Routes,Route, useNavigate } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import Player from "./Pages/Player/Player"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../Firebase/Firebase"
import { ToastContainer, } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function App() {
  const navigate=useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth,async (user)=>{
      if(user){
        console.log("Logged In");
        navigate('/home')
        
      }else{
        console.log("Logged Out");
        navigate('/')
        
      }
    })
  },[])

  return (
    <div>
      <ToastContainer theme="dark"/>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/player/:id" element={<Player/>}/>
      </Routes>
    </div>
  )
}

export default App
