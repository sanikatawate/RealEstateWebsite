import React, { useState } from "react"
import "./header.css"
import { nav } from "../../data/Data"
import { Link, useNavigate } from "react-router-dom"

const Header = ()=>{
  const [navList,setNavList]=useState(false)
  let navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/');

  }
  return (
      <header>
        <div className='container flex'>
          <div className='logo'>
          <Link to="/"><img src='./images/logo.png' alt='' /></Link>
            
          </div>
          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  {localStorage.getItem('token')&&<Link to={list.path}>{list.text}</Link>}
                </li>
              ))}
            </ul>
          </div>
          {!localStorage.getItem('token')
          ? <div className='button flex'>
              <Link to="/signup" role="button" className="signUpButton">SignUp</Link>
              <Link to="/login" role="button" className="loginButton">Login</Link>
            </div>
          : <button onClick={handleLogout} className="loginButton" style={{padding: "17px 0px"}}>Logout</button>}

          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </header>
  )
}
export default Header
