import Card from "./Card";
import React from "react";
import { useNavigate } from "react-router-dom";

function Deck({ cards, deck, onCardClick, token }) {
  const navigate = useNavigate();
  const deckString = encodeURIComponent(JSON.stringify(deck));
  const url = `match/initDeck?deck=${deckString}`;
  return (
    <div
      className="fixed-bottom bg-dark bg-opacity-75 bottom-0"
      style={{ zIndex: 500, maxWidth: "100%" }}
    >
      <h2
        className="text-center text-white"
        style={{ fontFamily: "'Permanent Marker', cursive" }}
      >
        My Deck
      </h2>
      <div style={{ overflowX: "scroll" }}>
        <div className="">
          {cards.length === 0 && (
            <div className="d-flex align-items-center justify-content-center">
              <p
                className="text-center"
                style={{
                  color: "#c0392b",
                  fontFamily: "Imbue,serif",
                  fontSize: "1.5rem",
                }}
              >
                Pick 20 heroes to fight
              </p>
            </div>
          )}
          {cards.length === 20 && (
            <div
              style={{ position: "relative", width: "100%", height: "38px" }}
            >
              <button
                className="position-fixed end-0 btn text-white"
                style={{
                  backgroundColor: "#e67e22",
                  fontFamily: "Imbue,serif",
                }}
                onClick={async () => {
                  const response = await fetch(
                    `${process.env.REACT_APP_GLOBAL_PORT}${url}`,
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
                    navigate("/match");
                  } else {
                    const errorText = await response.text(); // Récupérer le texte de l'erreur
                    if (
                      errorText.includes("A deck is already defined") ||
                      errorText.includes(
                        "The match status is not pending a deck"
                      )
                    ) {
                      navigate("/match");
                    } else {
                      console.error("Failed to send match request");
                    }
                  }
                }}
              >
                Enregistrer
              </button>
            </div>
          )}
          <div className="d-flex flex-row flex-start">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                width={`${200 - cards.length * 5}px`}
                info={false}
                onClick={() => onCardClick(card)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deck;
