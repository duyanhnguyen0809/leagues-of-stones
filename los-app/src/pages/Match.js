import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import cardback from "../images/backcard.jpg";
const Match = ({ username, token }) => {
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

  useEffect(() => {
    console.log("match: ", match);
  }, [match]);
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
                <button className="btn btn-primary" style={{ width: "80%" }}>
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
            <h3>HP: {opponent.hp}</h3>
          </div>
          <div
            className="mt-3 p-4 bg-dark rounded-4 bg-opacity-75 text-white text-center d-flex flex-column gap-4 justify-content-around"
            style={{ width: "100%" }}
          >
            Board
          </div>
          <div
            className="p-2 bg-dark rounded-4 bg-opacity-75 text-white text-center d-flex flex-row justify-content-between"
            style={{ width: "100%" }}
          >
            <h3>HP: {player.hp}</h3>
            <div className="d-flex flex-row justify-content-center">
              {player.hand.map((card, index) => (
                <Card key={index} card={card} width="6rem" />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Match;
