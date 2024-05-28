import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Home from './components/home'
import Library from './components/library'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<p>Hello</p>}></Route>
      <Route path='/login' element={<Landing />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/library' element={<Library />}></Route>
    </Routes>
  )
}

export default App