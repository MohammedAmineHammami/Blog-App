import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";

function Login() {
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(inputs);
      navigate("/");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const handleOnchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="loginContenair">
      <div className="loginInfo">
        <h1 className="header">Login</h1>
        <form onSubmit={handleOnSubmit} className="loginForm">
          <input
            type="text"
            placeholder="username"
            name="username"
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
          <button>Login</button>
        </form>
        <span className="loginMsg">
          <span className="errMsg">{error?.response?.data}</span>
          <b>Don't have an account!</b>
          <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
