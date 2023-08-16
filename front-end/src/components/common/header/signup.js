import React, { useState } from "react";
import "../../contact/contact.css";
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
  const [temp, setTemp] = useState({
    username: "",
    email: "",
    password: "",
    cnfpassword: ""
  });
  let navigate = useNavigate();
  // const [temp,setTemp] = useState("")

  const handleChange = (e) => {
    setTemp((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("TEMP", temp)
    const response = await fetch("http://localhost:1337/signup", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(temp),
    });
    let data = await response.json()
    console.log(data);
    if(data.success){
      localStorage.setItem('token', data.authtoken)
      navigate('/')
    }
    else{
      alert("Invalid Credentials");
    }
  };
  return (
    <>
      <section className="contact mb">
        <div className="container" style={{width:"40%"}}>
          <form className="shadow">
            <h4>Sign In</h4> <br />
            <div>
              <input
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                value={temp.username}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                value={temp.email}
                minLength={6}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter Password"
                id="password"
                onChange={handleChange}
                value={temp.password}
                minLength={6}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                id="cnfpassword"
                onChange={handleChange}
                value={temp.cnfpassword}
                minLength={6}
                required
              />
            </div>
            <button onClick={handleSubmit}>Create Account</button>

            <br/>
            <br/>
            <p style={{fontSize:'12px'}}>Have an account?</p>
            <Link to="/login" >Login</Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
