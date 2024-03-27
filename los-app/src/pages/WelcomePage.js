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
        className="p-4 rounded-2 bg-opacity-75 text-white"
        style={{
          width: "30%",
          borderColor: "rgba(204, 174, 98, 0.4)",
          borderWidth: "2px",
          borderStyle: "solid",
          fontFamily: "'Prata', serif",
          backgroundColor: "#222838",
        }}
      >
        <div className="d-flex flex-column gap-4 justify-content-center pb-5">
          <div
            className="d-flex justify-content-center"
            style={{ fontFamily: "'Architects Daughter', cursive" }}
          >
            Bienvenue, <span style={{ color: "#EAB543" }}>{username} </span>!
          </div>
          <button
            onClick={handleClick}
            style={{
              backgroundColor: "#58B19F",
              borderRadius: "20px",
              borderColor: "#25CCF7",
            }}
          >
            Matchmaking
          </button>

          <Link
            className="d-flex justify-content-center"
            style={{
              backgroundColor: "#58B19F",
              color: "black",
              borderRadius: "20px",
              borderColor: "#25CCF7",
            }}
            to={"/game"}
          >
            Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;
