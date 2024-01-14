import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Login from './Pages/Login'

import Register from './Pages/Register'
import Chat from './Pages/Chat'
import PageNotFound from './Pages/PageNotFound'
import SetAvtar from './Pages/SetAvtar'
import UserState from './Context/userState'
import Contacts from './components/Contacts'


const App = () => {
 return(
  <>

  <BrowserRouter>
  <UserState>
    <Routes>
      <Route path='/' element={<Chat/>}/>
      <Route path='/register' element={<Register/>}/> 
      <Route path='/login' element={<Login/>}/> 
      <Route path='*' element={<PageNotFound/>}/> 
      <Route path='/setAvtar' element={<SetAvtar/>}/> 
      {/* <Route path='/contact' element={<Contacts/>}/>  */}

    </Routes>
    </UserState>
  </BrowserRouter>
  </>
 )
}

export default App
