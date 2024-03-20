import React from "react";
import Card from "./Card";

function Deck({ cards, onCardClick }) {

  const handleClick = (card) => {
    if (cards.length < 20) {
      onCardClick(card);
    }
  };

  return (
    <div
      className="fixed-bottom bg-dark bg-opacity-75 bottom-0"
      style={{ zIndex: 500, maxWidth: "100%" }}
    >
      <h2 className="text-center">My Deck</h2>
      <div style={{ overflowX: "scroll" }}>
        <div className="">
          {cards.length === 0 && (
            <div className="d-flex align-items-center justify-content-center">
              <p className="text-white text-center">Empty Deck</p>
            </div>
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
                width={`${200 - cards.length * 5}px`}
                info={false}
                onClick={() => handleClick(card)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deck;
