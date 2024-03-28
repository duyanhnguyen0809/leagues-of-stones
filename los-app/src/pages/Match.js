import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import image from "../images/hero-img.jpg";
import ava1 from "../images/player01.png";
import ava2 from "../images/player02.png";
import attack from "../sounds/attack.wav";

const Match = ({ username, token }) => {
  const [match, setMatch] = useState([]);
  const [isAccepted, setIsAccepted] = useState(false);
  const player =
    match && match.player1 && match.player1.name === username
      ? match.player1
      : match.player2;

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(
        process.env.REACT_APP_GLOBAL_PORT + "match/getMatch",
        {
          method: "GET",
          headers: {
            "WWW-Authenticate": token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMatch(data);
        console.log("data: ", data);
      } else {
        console.error("Failed to fetch matches");
      }
    };

    fetchMatches();
  }, []);

  const playSound = () => {
    const audio = new Audio(attack);
    audio.play();
  };

  useEffect(() => {
    console.log("match: ", match);
  }, [match]);
  return (
    <div
      style={{
        backgroundImage: `url('${image}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {
        <section
          className="d-flex justify-content-center align-items-center container-fluid flex-column"
          style={{ height: "90vh" }}
        >
          {!isAccepted ? ( // If the match is not accepted, show this div
            <div
              className="p-4 rounded-4 text-white text-center d-flex flex-column gap-4 justify-content-around"
              style={{
                width: "50%",
                backgroundColor: "black",
                opacity: "0.9",
                boxShadow: "0 0 1rem 0 #82589F",
              }}
            >
              <div className="d-flex flex-row m-3 justify-content-evenly">
                <div>
                  <h6
                    style={{
                      fontFamily: "'Slabo 27px', sans-serif",
                      color: "#CAD3C8",
                    }}
                  >
                    {match === null || !match.player1
                      ? "loading"
                      : match.player1.name}
                  </h6>
                  <div className="d-flex flex-column justify-content-around gap-2 align-items-center">
                    <img
                      src={ava2}
                      alt="Player 2"
                      style={{
                        borderRadius: "50px",
                        height: "100px",
                        width: "100px",
                      }}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                  <h1
                    style={{
                      fontFamily: "'Permanent Marker', cursive",
                      fontWeight: "900",
                      fontStyle: "italic",
                      fontSize: "4rem",
                      color: "#F8EFBA",

                    }}
                  >
                    VS
                  </h1>
                </div>
                <div>
                  <h6
                    style={{
                      fontFamily: "'Slabo 27px', sans-serif",
                      color: "#CAD3C8",
                    }}
                  >
                    {match === null || !match.player2
                      ? "loading"
                      : match.player2.name}
                  </h6>
                  <div className="d-flex flex-column justify-content-around gap-2 align-items-center">
                    <img
                      src={ava1}
                      alt="Player 1"
                      style={{
                        borderRadius: "50px",
                        height: "100px",
                        width: "100px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-around gap-2 align-items-center">
                {match.status === "Deck is pending" ? (
                  <>
                    <button
                      className="btn"
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
                      }}
                      onClick={playSound}
                    >
                      Valider mon deck
                    </button>
                    <button
                      className="btn disabled"
                      style={{
                        width: "30%",
                        borderColor: "#82589F",
                        backgroundColor: "black",
                        color: "white",
                        textShadow: "0 0 1rem #fff",
                        fontFamily: "'Russo One', serif",
                        fontWeight: "400",
                        fontOpticalSizing: "auto",
                        fontStyle: "normal",
                      }}
                      onClick={playSound}
                    >
                      Accepter match
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn"
                      style={{
                        width: "30%",
                        backgroundColor: "black",
                        borderColor: "#82589F",
                        color: "white",
                        boxShadow:
                          "inset 0 0 2rem 0 #82589F, 0 0 1rem 0 #82589F",
                        textShadow: "0 0 1rem #fff",
                        fontFamily: "'Russo One', serif",
                        fontWeight: "400",
                        fontOpticalSizing: "auto",
                        fontStyle: "normal",
                      }}
                      onClick={playSound}
                    >
                      Voir mon deck
                    </button>
                    <button
                      className="btn"
                      style={{
                        width: "30%",
                        backgroundColor: "black",
                        borderColor: "#82589F",
                        color: "white",
                        boxShadow:
                          "inset 0 0 2rem 0 #82589F, 0 0 1rem 0 #82589F",
                        textShadow: "0 0 1rem #fff",
                        fontFamily: "'Russo One', serif",
                        fontWeight: "400",
                        fontOpticalSizing: "auto",
                        fontStyle: "normal",
                      }}
                      onClick={() => setIsAccepted(true)}
                    >
                      Accepter match
                    </button>
                  </>
                )}

                <button
                  className="btn"
                  style={{
                    width: "30%",
                    borderColor: "#b33939",
                    color: "white",
                    boxShadow: "inset 0 0 2rem 0 #b33939, 0 0 1rem 0 #b33939",
                    fontFamily: "'Russo One', sans-serif",
                    fontWeight: "400",
                    fontOpticalSizing: "auto",
                    fontStyle: "normal",
                  }}
                  onClick={playSound}
                >
                  Annuler match
                </button>
              </div>
            </div>
          ) : (
            // If the match is accepted, show this div
            <div
              className="p-4 bg-dark rounded-4 bg-opacity-75 text-white text-center d-flex flex-column gap-4 justify-content-around"
              style={{ width: "100%" }}
            >
              <div className="d-flex flex-row justify-content-center">
                {player.hand.map((card, index) => (
                  <Card key={index} card={card} width="10rem" />
                ))}
              </div>
            </div>
          )}
        </section>
      }
    </div>
  );
};

export default Match;
