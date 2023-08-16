import React from "react"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import Location from "./location/Location"
// import Price from "./price/Price"
import Recent from "./recent/Recent"


const Home = () => {
  return (
    <>
      <Hero />
      {localStorage.getItem('token')&&<Featured />}
      {localStorage.getItem('token')&&<Recent />}
      {localStorage.getItem('token')&&<Location />}
      
      {/* <Price /> */}
    </>
  )
}

export default Home
