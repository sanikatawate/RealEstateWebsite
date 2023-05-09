import React from 'react';
// import React, { useState, useEffect } from 'react';
import { list } from "../../data/Data"

const RecentCard = () => {
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   async function fetchList() {
  //     try {
  //       const response = await fetch('http://localhost:1337/list');
  //       const data = await response.json();
  //       setList(data);
  //     } catch (error) {
  //       console.log('Error fetching users', error);
  //     }
  //   }
  //   fetchList();
  // }, []);

  return (
    <>
      <div className='content grid3 mtop'>
      {list.map((val, index) => {
          const { cover, category, location, name, price, type } = val
        console.log("data123",cover, category, location, name, price, type)
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                <img src={cover} alt='' />
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: category === "For Sale" ? "#25b5791a" : "#ff98001a", color: category === "For Sale" ? "#25b579" : "#ff9800" }}>{category}</span>
                  <i className='fa fa-heart'></i>
                </div>
                <h4>{name}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {location}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2'>{price}</button> <label htmlFor=''>/sqft</label>
                </div>
                <span>{type}</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
