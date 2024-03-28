import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import cardback from "../images/backcard.jpg";
import { useNavigate } from "react-router-dom";

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
          height: `${hpPercentage}%`,
          background: "red",
        }}
      />
    </div>
  );
}

const Match = ({ username, token }) => {
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
            `match/attack?card=${encodeURIComponent(selectedCard.key)}&enemyCard=${encodeURIComponent(enemyCardKey)}`,
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
        // You can do something with the updated hand and board here, like updating the player's state
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
    <section
      className={`d-flex  align-items-center container-fluid flex-column ${
        isAccepted ? "justify-content-start" : "justify-content-center"
      }`}
      style={{ height: "90vh" }}
    >
      {!isAccepted ? ( // If the match is not accepted, show this div
        <div
          className="p-4 bg-dark rounded-4 bg-opacity-75 text-white text-center d-flex flex-column gap-4 justify-content-around"
          style={{ width: "30%" }}
        >
          <h3>
            {match === null || !match.player1 ? "loading" : match.player1.name}
          </h3>
          <h2>VS</h2>
          <h3>
            {match === null || !match.player2 ? "loading" : match.player2.name}
          </h3>
          <div className="d-flex flex-column justify-content-around gap-2 align-items-center">
            {match.status === "Deck is pending" ? (
              <>
                <p>Valider votre deck d'abord</p>
                <button
                  className="btn btn-primary"
                  onClick={navigate("/game")}
                  style={{ width: "80%" }}
                >
                  Voir mon deck
                </button>
                <button
                  className="btn btn-primary disabled"
                  style={{ width: "80%" }}
                >
                  Accepter match
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-primary" style={{ width: "80%" }}>
                  Voir mon deck
                </button>
                <button
                  className="btn btn-primary"
                  style={{ width: "80%" }}
                  onClick={() => setIsAccepted(true)}
                >
                  Accepter match
                </button>
              </>
            )}

            <button className="btn btn-danger" style={{ width: "80%" }}>
              Annuler match
            </button>
          </div>
        </div>
      ) : (
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
            <HealthBar hp={75} maxHp={150} />
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
                      />
                      {pickedEnemyCard === card.key && (
                        <button onClick={() => attack(card.key)}>Attack</button>
                      )}
                    </>
                  ))
                : !player.turn && (
                    <button onClick={() => attack(pickedEnemyCard)}>
                      Attack Opponent Directly
                    </button>
                  )}
            </div>
            <p>{player.turn ? "Your turn" : "Opponent's turn"}</p>
            <div className="d-flex flex-row justify-content-center">
              {player.board.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  width="6rem"
                  onClick={() => setSelectedCard(card)}
                />
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
                <Card
                  key={index}
                  card={card}
                  width="6rem"
                  onClick={() => playCard(card.key)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Match;
