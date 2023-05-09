import React from "react"
import Header from "../common/header/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../home/Home"
import Footer from "../common/footer/Footer"
import About from "../about/About"
import Pricing from "../pricing/Pricing"
import Blog from "../blog/Blog"
import Contact from "../contact/Contact"
import Signup from "../common/header/signup"
import Login from "../common/header/Login"

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route  path='/' element={<Home/>} />
          <Route  path='/about' element={<About/>} />
          <Route  path='/blog' element={<Blog/>} />
          <Route  path='/pricing' element={<Pricing/>} />
          <Route  path='/contact' element={<Contact/>} />
          <Route  path='/signup' element={<Signup/>} />
          <Route  path='/login' element={<Login/>} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default Pages
