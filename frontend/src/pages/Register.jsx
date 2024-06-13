import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleOnchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        inputs
      );
      console.log(res);
      navigate("/login");
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className="loginContenair">
      <div className="loginInfo">
        <h1 className="header">Register</h1>
        <form onSubmit={handleOnSubmit} className="loginForm">
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handleOnchange}
            required
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={handleOnchange}
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleOnchange}
            required
          />
          <button>Register</button>
        </form>
        <span className="loginMsg">
          <span className="errMsg">{error?.response?.data}</span>
          <b>Do you have an account!</b>
          <Link to="/Login">Login</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
