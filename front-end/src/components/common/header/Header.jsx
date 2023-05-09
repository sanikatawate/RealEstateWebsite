import React, { useState } from "react"
import "./header.css"
import { nav } from "../../data/Data"
import { Link } from "react-router-dom"

const Header = ()=>{
  const [navList,setNavList]=useState(false)
  return (
      <header>
        <div className='container flex'>
          <div className='logo'>
            <img src='./images/logo.png' alt='' />
          </div>
          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='button flex'>
            
            <button className='btn' style={{marginRight:'20px', marginLeft:'20px'}}> 
              <Link to="/su" style={{ width: "75px", height: "36px", margin:'0'}}>SignUp</Link>
            </button>

            <button className='btn'> 
              <Link to="/login" style={{ width: "75px", height: "36px",margin:'0'}}>Login</Link>
            </button>
            
          </div>

          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </header>
  )
}
export default Header
