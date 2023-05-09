import React from "react"
// import React, { useState, useEffect } from 'react';
import Heading from "../../common/Heading"
import { location } from "../../data/Data"
import "./style.css"

const Location = () => {

  // const [location, setLocation] = useState([]);

  // useEffect(() => {
  //   async function fetchList() {
  //     try {
  //       const response = await fetch('http://localhost:1337/location');
  //       const data = await response.json();
  //       setLocation(data);
  //     } catch (error) {
  //       console.log('Error fetching users', error);
  //     }
  //   }
  //   fetchList();
  // }, []);

  return (
    <>
      <section className='location padding'>
        <div className='container'>
          <Heading title='Explore By Location' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />

          <div className='content grid3 mtop'>
            {location.map((item, index) => (
              <div className='box' key={index}>
                <img src={item.cover} alt='' />
                <div className='overlay'>
                  <h5>{item.name}</h5>
                  <p>
                    <label>{item.Villas}</label>
                    <label>{item.Offices}</label>
                    <label>{item.Apartments}</label>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Location
