import React, { useState } from "react";
import "../../contact/contact.css";
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const [temp, setTemp] = useState({
    username: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate();
  // const [temp,setTemp] = useState("")

  const handleChange = (e) => {
    setTemp((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:1337/login", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(temp),
    });
    let data = await response.json()
    console.log(data);
    if (data.success) {
      localStorage.setItem('token', data.authtoken);
      navigate('/');
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
            <h4>Login</h4> <br />
            <div>
              <input
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                value={temp.username}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                value={temp.email}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter Password"
                id="password"
                onChange={handleChange}
                value={temp.password}
              />
            </div>
            <button onClick={handleSubmit}>Login</button>

            <br/>
            <br/>
            <p style={{fontSize:'12px'}}>Don't have an account?</p>
            <Link to="/signup" >Create Account</Link>
            
          </form>
          
        </div>
      </section>
    </>
  );
};

export default Login;