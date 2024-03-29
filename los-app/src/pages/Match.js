/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import image from "../images/hero-img.jpg";
import ava1 from "../images/player01.png";
import ava2 from "../images/player02.png";
import attack_sound from "../sounds/attack.wav";
import cardback from "../images/backcard.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


function HealthBar({ hp, maxHp }) {
  const hpPercentage = (hp / maxHp) * 100;
  

  return (
    <div
      style={{
        width: "30px",
        height: "150px",
        borderRadius: "10px",
        background: "rgba(0, 0, 0, 0.3)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: hpPercentage + "%",
          background: "red",
        }}
      />
    </div>
  );
}

const Match = () => {
  const username = useSelector((state) => state.auth.name);
  const token = useSelector((state) => state.auth.token);
  const [pickedEnemyCard, setPickedEnemyCard] = useState("");
  const navigate = useNavigate();
  const [match, setMatch] = useState([]);
  const [isAccepted, setIsAccepted] = useState(false);
  const player =
    match && match.player1 && match.player1.name === username
      ? match.player1
      : match.player2;
  const opponent =
    match && match.player1 && match.player1.name === username
      ? match.player2
      : match.player1;

  const [selectedCard, setSelectedCard] = useState(null);

  const attack = async (enemyCardKey) => {
    if (player.turn && selectedCard && !selectedCard.attack) {
      let response;
      if (opponent.board.length === 0) {
        // Attack the opponent directly if their board is empty
        response = await fetch(
          process.env.REACT_APP_GLOBAL_PORT +
            `match/attackPlayer?card=${encodeURIComponent(selectedCard.key)}`,
          {
            method: "GET",
            headers: {
              "WWW-Authenticate": token,
            },
          }
        );
      } else {
        // Otherwise, attack a card on the opponent's board
        response = await fetch(
          process.env.REACT_APP_GLOBAL_PORT +
            `match/attack?card=${encodeURIComponent(
              selectedCard.key
            )}&ennemyCard=${encodeURIComponent(enemyCardKey)}`,
          {
            method: "GET",
            headers: {
              "WWW-Authenticate": token,
            },
          }
        );
      }

      if (response.ok) {
        const { hand, board } = await response.json();
        console.log("Updated hand: ", hand);
        console.log("Updated board: ", board);
        // You can do something with the updated hand and board here, like updating the player's state
      } else {
        console.error("Failed to attack");
      }
    }
  };
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
      } else {
        console.error("Failed to fetch matches");
      }
    };

    fetchMatches();
    const intervalId = setInterval(fetchMatches, 2000); // Call it every 2 seconds

    // Clean up function
    return () => clearInterval(intervalId);
  }, []);

  const playSound = () => {
    const audio = new Audio(attack_sound);
    audio.play();
  };

  useEffect(() => {
    console.log("match: ", match);
  }, [match]);

  const playCard = async (cardKey) => {
    if (player.turn && player.board.length < 5) {
      const response = await fetch(
        process.env.REACT_APP_GLOBAL_PORT + `match/playCard?card=${cardKey}`,
        {
          method: "GET",
          headers: {
            "WWW-Authenticate": token,
          },
        }
      );

      if (response.ok) {
        const { hand, board } = await response.json();
        console.log("Updated hand: ", hand);
        console.log("Updated board: ", board);
      } else {
        console.error("Failed to play card");
      }
    }
  };
  const endTurn = async () => {
    if (player.turn) {
      const response = await fetch(
        process.env.REACT_APP_GLOBAL_PORT + "match/endTurn",
        {
          method: "GET",
          headers: {
            "WWW-Authenticate": token,
          },
        }
      );

      if (response.ok) {
        console.log("Turn ended");
        // You can do something here like fetching the match data to update the turn
      } else {
        console.error("Failed to end turn");
      }
    }
  };
  const drawCard = async () => {
    if (player.turn && !player.cardPicked) {
      const response = await fetch(
        process.env.REACT_APP_GLOBAL_PORT + "match/pickCard",
        {
          method: "GET",
          headers: {
            "WWW-Authenticate": token,
          },
        }
      );

      if (response.ok) {
        const card = await response.json();
        console.log("Drawn card: ", card);
        // You can do something with the drawn card here, like adding it to the player's hand
      } else {
        console.error("Failed to draw card");
      }
    }
  };

  useEffect(() => {}, [match]);
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
                      onClick={() => {
                        playSound();
                        navigate("/game");
                      }}
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
              className="d-flex flex-column justify-content-between"
              style={{ width: "100%", height: "100%" }}
            >
              <div
                className="p-2 bg-dark rounded-4 bg-opacity-75 text-white text-center d-flex flex-row  justify-content-between"
                style={{ width: "100%" }}
              >
                <div className="d-flex flex-row justify-content-center gap-4">
                  {Array.from({ length: opponent.hand }).map((_, index) => (
                    <img
                      key={index}
                      src={cardback}
                      alt="Card back"
                      style={{ width: "6rem", height: "10rem" }}
                    />
                  ))}
                </div>
                <HealthBar hp={opponent.hp} maxHp={150} />
              </div>
              <div
                className="mt-3 p-1 bg-dark rounded-4 bg-opacity-75 text-white text-center d-flex flex-column gap-4 justify-content-around"
                style={{ width: "100%" }}
              >
                <div className="d-flex flex-row justify-content-center">
                  {opponent.board.length > 0
                    ? opponent.board.map((card, index) => (
                        <>
                          <Card
                            key={index}
                            card={card}
                            width="6rem"
                            onClick={() => setPickedEnemyCard(card.key)}
                            showTooltip={true}
                          />
                          {pickedEnemyCard === card.key && (
                            <button onClick={() => attack(card.key)}>
                              Attack
                            </button>
                          )}
                        </>
                      ))
                    : player.turn && (
                        <button onClick={() => attack(pickedEnemyCard)}>
                          Attack Opponent Directly
                        </button>
                      )}
                </div>
                <p>{player.turn ? "Your turn" : "Opponent's turn"}</p>
                <div className="d-flex flex-row justify-content-center">
                  {player.board.map((card, index) => (
                    <div>
                      <Card
                        key={index}
                        card={card}
                        width="6rem"
                        onClick={() => setSelectedCard(card)}
                        showTooltip={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="p-2 bg-dark rounded-4 bg-opacity-75 text-white text-center d-flex flex-row justify-content-between"
                style={{ width: "100%" }}
              >
                <HealthBar hp={player.hp} maxHp={150} />
                <button
                  onClick={drawCard}
                  disabled={!player.turn || player.cardPicked}
                >
                  Draw Card
                </button>
                <button onClick={endTurn} disabled={!player.turn}>
                  End Turn
                </button>
                <div className="d-flex flex-row justify-content-center">
                  {player.hand.map((card, index) => (
                    <div>
                      <Card
                        key={index}
                        card={card}
                        width="6rem"
                        onClick={() => playCard(card.key)}
                        showTooltip={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      }
    </div>
  );
};

export default Match;
