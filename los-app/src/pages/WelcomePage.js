import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const WelcomePage = ({ username, token }) => {
  const navigate = useNavigate();
  // const username = localStorage.getItem("username");
  // const token = localStorage.getItem("authToken");
  const handleClick = async () => {
    const response = await fetch(
      process.env.REACT_APP_GLOBAL_PORT + "matchmaking/participate",
      {
        method: "GET",
        headers: {
          "WWW-Authenticate": token,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data.match) {
        console.log("Match found");
        navigate("/match");
      } else {
        navigate("/lobby");
      }
    } else {
      console.error("Failed to participate in matchmaking");
    }
  };
  return (
    <section
      className="d-flex justify-content-center align-items-center container-fluid flex-column"
      style={{ height: "80vh" }}
    >
      <div
        className="p-4 bg-dark rounded-4 bg-opacity-75 text-white"
        style={{ width: "30%" }}
      >
        <div className="d-flex flex-column gap-4 justify-content-center pb-5">
          <div className="d-flex justify-content-center">
            Bonjour, {username}{" "}
          </div>
          <button onClick={handleClick} className="btn btn-primary">
            Matchmaking
          </button>

          <Link className="btn btn-primary" to={"/game"}>
            Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;
