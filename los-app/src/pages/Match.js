import React, { useEffect, useState } from "react";

const Match = ({ username, token }) => {
  const [match, setMatch] = useState([]);
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
      className="d-flex justify-content-center align-items-center container-fluid flex-column"
      style={{ height: "80vh" }}
    >
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
              <button className="btn btn-primary" style={{width : '80%'}}>Voir mon deck</button>
              <button className="btn btn-primary disabled" style={{width : '80%'}}>
                Accepter match
              </button>
            </>
          ) : (
            <button className="btn btn-primary" style={{width : '80%'}}>Accepter match</button>
          )}

          <button className="btn btn-danger" style={{width : '80%'}}>Annuler match</button>
        </div>
      </div>
    </section>
  );
};

export default Match;
