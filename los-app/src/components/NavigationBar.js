import React from "react";
import logo from "../images/LoS-2-7-2024.png";
import buttonLogin from "../images/Se-Connecter.png";
import buttonLogout from "../images/Deconnecter.png";
import { useDispatch } from "react-redux";
import { clearToken } from "../features/authSlice"; // replace with the path to your authSlice

function NavigationBar({ token }) {
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    const response = await fetch("http://localhost:3002/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "www-authenticate": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      dispatch(clearToken());
    } else {
      console.error("Failed to log out");
    }
  };

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
                  className="btn btn-outline-success ml-2"
                  onClick={handleLogOut}
                >
                  <img
                    src={buttonLogout}
                    alt="ButtonSignin"
                    style={{ height: "30px" }}
                  />
                </button>
              ) : (
                <button className="btn btn-outline-success ml-2">
                  <img
                    src={buttonLogin}
                    alt="ButtonSignin"
                    style={{ height: "30px" }}
                  />
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
