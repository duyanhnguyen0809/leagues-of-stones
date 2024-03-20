import React from "react";
import Card from "./Card";

function Deck({ cards, deck, onCardClick, token }) {

  return (
    <div
      className="fixed-bottom bg-dark bg-opacity-75 bottom-0"
      style={{ zIndex: 500, maxWidth: "100%" }}
    >
      <h2 className="text-center text-white">My Deck</h2>
      <div style={{ overflowX: "scroll" }}>
        <div className="">
          {cards.length === 0 && (
            <div className="d-flex align-items-center justify-content-center">
              <p className="text-white text-center">Empty Deck</p>
            </div>
          )}
          {cards.length === 20 && (
            <div style={{ position: "relative",width: "100%", height: "38px" }}>
              <button 
              style={{ position: "absolute", right: "3%" }} 
              className="btn text-white"
              onClick={async () => {
                const response = await fetch(
                  `${process.env.REACT_APP_GLOBAL_PORT}match/initDeck?deck=${[deck]}`,
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
                } else {
                  console.error("Failed to send match request");
                }
              }}
              >
                Enregistrer
              </button>
            </div>
          )}
          <div className="d-flex flex-row flex-start">
            {" "}
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
