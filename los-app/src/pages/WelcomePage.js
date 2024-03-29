import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import attack from "../sounds/attack.wav";
import defense from "../sounds/defense.mp3";



const WelcomePage = ({ username, token: propToken }) => {
  const [token, setToken] = useState(propToken);
  const [refreshed, setRefreshed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (propToken) {
      setToken(propToken);
    }
  }, [propToken]);

  useEffect(() => {
    console.log("Le composant est monté."); 
    if (!refreshed) {
      console.log("Le composant est monté pour la première fois, initialisation du setTimeout.");
      const timeoutId = setTimeout(() => {
        navigate("/welcome", { replace: true });
      }, 1000);
      setRefreshed(true); 
      
      return () => clearTimeout(timeoutId);
    }
  }, [refreshed]);
  
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
      window.location.reload();
      console.error("Failed to participate in matchmaking");
    }
  };

  const playSound = () => {
    const audio = new Audio(attack);
    audio.play();
  };
  const playSound2 = () => {
    const audio = new Audio(defense);
    audio.play();
  };

  
  return (
    <section
      className="d-flex justify-content-center align-items-center container-fluid flex-column bg-dark bg-opacity-75"
      style={{ height: "90vh" }}
    >
      <div
        className="p-4 rounded-2 bg-opacity-75 text-white"
        style={{
          width: "35%",
          backgroundColor: "black",
          opacity: "0.9",
          boxShadow: "0 0 1rem 0 #82589F",
        }}
      >
        <div className="d-flex flex-column gap-4 justify-content-center align-items-center pb-5 ">
          <div
            className="d-flex justify-content-center"
            style={{ fontFamily: "'Slabo 27px', sans-serif" }}
          >
            Bienvenue, <span style={{ color: "#EAB543" }}>{username} </span>!
          </div>
          <button
            onClick={() => {
              handleClick();
              playSound();
            }}
            style={{
              width: "30%",
              backgroundColor: "black",
              borderColor: "#63cdda",
              color: "#fff",
              boxShadow:
                "inset 0 0 2rem 0 #63cdda, 0 0 1rem 0 #63cdda",
              textShadow: "0 0 1rem #fff",
              fontFamily: "'Russo One', serif",
              fontWeight: "400",
              fontOpticalSizing: "auto",
              fontStyle: "normal",
            }}

          >
            Matchmaking
          </button>
          <Link
            
            className="d-flex justify-content-center"
            onClick={() => {
              playSound2();
            }}
            style={{
              width: "30%",
              backgroundColor: "black",
              borderColor: "#82589F",
              color: "#fff",
              boxShadow:
                "inset 0 0 2rem 0 #82589F, 0 0 1rem 0 #82589F",
              textShadow: "0 0 1rem #fff",
              fontFamily: "'Russo One', serif",
              fontWeight: "400",
              fontOpticalSizing: "auto",
              fontStyle: "normal",
              textDecoration: "none",
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
