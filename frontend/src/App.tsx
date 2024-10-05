import { BrowserRouter, Route, Routes } from 'react-router-dom'


import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogpage } from './pages/Blogpage'
import { LandingPage } from './pages/Landingpage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage></LandingPage>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/Signin' element={<Signin></Signin>}></Route>
        <Route path="/blog/:id" element={<Blogpage></Blogpage>} />
        <Route path='/Blog/' element={<Blog></Blog>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
