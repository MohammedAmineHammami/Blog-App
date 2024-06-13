import React, { useContext } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";

function Navbar() {
  const { currentUser, logOut } = useContext(AuthContext);
  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>

      <div className="category">
        <Link className="link" to="/?cat=art">
          Art
        </Link>
        <Link className="link" to="/?cat=science">
          Science
        </Link>
        <Link className="link" to="/?cat=technologie">
          Technologie
        </Link>
        <Link className="link" to="/?cat=food">
          Food
        </Link>
        <Link className="link" to="/?cat=cinema">
          Cinema
        </Link>
        <span className="navSpan">
          <h3>{currentUser?.username}</h3>
          {currentUser && (
            <Link style={{ color: "black" }} to="/login">
              <h3 onClick={logOut}>LogOut</h3>
            </Link>
          )}
        </span>
        <Link to="/post/write">
          <button>Write</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
