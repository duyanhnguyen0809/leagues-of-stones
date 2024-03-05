import React from "react";
import Card from "./Card";

function Deck({ cards, onCardClick }) {
  return (
    <div
      className="fixed-bottom bg-primary bottom-0"
      style={{ zIndex: 500, maxWidth: "100%" }}
    >
      <h2 className="text-center">My Deck</h2>
      <div style={{ overflowX: "scroll" }}>
        <div className="d-flex flex-row">
          {cards.length === 0 && (
            <p className="text-white text-center">Empty Deck</p>
          )}
          {cards.length === 20 && (
            <button className="btn text-white">Let's go</button>
          )}
          <div className="d-flex flex-row flex-start">
            {" "}
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                width={"200px"}
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
