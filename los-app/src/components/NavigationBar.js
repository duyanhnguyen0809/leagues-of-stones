import React, { useState } from "react";
import logo from "../images/los.png";
import SignInButton from "./SignInButton"
import SignUpButton from "./SignUpButton"
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice"; // replace with the path to your authSlice

function NavigationBar({ token }) {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogOut = async () => {
    const response = await fetch("http://localhost:3002/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "www-authenticate": `Bearer ${token}`,
      },
    });

    
    if (response.ok) {
      dispatch(logout());
    } else {
      console.error("Failed to log out");
    }
  };
  
  const handleSignInClick = () => {
    setIsLoggedIn(true)
  }

  const handleSignUpClick = () => {
    setIsLoggedIn(false)
  }

  let button;
  if (isLoggedIn) {
    button = <SignUpButton onClick={handleSignUpClick} />;
  } else {
    button = <SignInButton onClick={handleSignInClick} />;
  }


  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-light fixed-top bg-opacity-75">
      <div className="w-100 d-flex justify-content-between mx-3">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" style={{ height: "50px" }} />
        </a>
        <div className="navbar-collapse collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              {token ? (
                <button
                  className="btn btn-outline-success ml-2" style={{
                    width: "100%",
                    backgroundColor: "#c0392b",
                    borderColor: "#c0392b",
                    color: "#fff",
                    boxShadow:
                      "inset 0 0 2rem 0 #c0392b, 0 0 1rem 0 #c0392b",
                    textShadow: "0 0 1rem #fff",
                    fontFamily: "'Russo One', serif",
                    fontWeight: "400",
                    fontOpticalSizing: "auto",
                    fontStyle: "normal",
                    textDecoration: "none",
                  }}
                  onClick={handleLogOut}
                > Deconnecter
                
                </button>
              ) : (
                button
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
