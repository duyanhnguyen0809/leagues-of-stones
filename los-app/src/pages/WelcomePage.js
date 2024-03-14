import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const WelcomePage = () => {
  const userName = localStorage.getItem("username") // replace 'auth' and 'name' with the actual path to the user's name in your Redux state
  return (
    <div
      className="d-flex justify-content-center align-items-center container-fluid flex-column"
      style={{ height: "80vh" }}
    >
      <div
        className="p-4 bg-dark rounded-4 bg-opacity-75 text-white"
        style={{ width: "30%" }}
      >
        <div className="d-flex flex-column gap-4 justify-content-center pb-5">
          <div className="d-flex justify-content-center">Bonjour, {userName} </div>
          <button className="btn btn-primary">Matchmaking</button>

          <Link className="btn btn-primary" to={"/game"}>
            Gallery
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
