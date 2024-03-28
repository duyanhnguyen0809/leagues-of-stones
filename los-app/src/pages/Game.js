import React, { useState, useEffect } from "react";
import Card from "../components/Card/Card";
import Deck from "../components/Deck";
import image from "../images/landing.jpg";

const Game = ({ token }) => {
  const [availableCards, setAvailableCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [minimized, setMinimized] = useState(false);
  const [deckEnd, setDeckEnd] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/cards")
      .then((response) => response.json())
      .then((data) =>
        setAvailableCards(
          data.map((card, index) => ({
            ...card,
            originalIndex: index,
          }))
        )
      )
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleCardClick = (card) => {
    if (deck.length <= 19) {
      setAvailableCards(availableCards.filter((c) => c.id !== card.id));
      setDeck([...deck, card]);
      setDeckEnd([...deckEnd, { key: card.key }]);
    }
    console.log(deckEnd);
  };

  const handleRemoveCard = (card) => {
    const newAvailableCards = [...availableCards, card].sort(
      (a, b) => a.originalIndex - b.originalIndex
    );

    setDeck(deck.filter((c) => c.id !== card.id));
    setDeckEnd(deckEnd.filter((c) => c.key !== card.key)); // Remove card from deckEnd
    setAvailableCards(newAvailableCards);
    console.log(deckEnd);
  };

  const handleMinimizeClick = () => {
    setMinimized(!minimized);
  };

  return (
    <div
      style={{
        backgroundImage: `url('${image}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {
        <div className="container-fluid">
          <div className="row ">
            {minimized && (
              <button
                type="button"
                className="btn btn-primary m-3 fs-2"
                style={{
                  position: "fixed",
                  width: "100px",
                  height: "100px",
                  right: "0",
                  bottom: "0",
                  zIndex: "1000",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {deck.length}
              </button>
            )}

            <button
              onClick={handleMinimizeClick}
              className="fixed-bottom btn btn-danger m-3"
              style={{ width: "50px", height: "50px" }}
            >
              {minimized ? "+" : "-"}
            </button>
            <div className="col-md-12">
              <div className="row no-gutters justify-content-center">
                {availableCards.map((card) => (
                  <Card
                    key={card.id}
                    card={card}
                    onClick={() => handleCardClick(card)}
                  />
                ))}
              </div>
            </div>

            {!minimized && (
              <Deck
                cards={deck}
                deck={deckEnd}
                onCardClick={handleRemoveCard}
                token={token}
              />
            )}
          </div>
        </div>
      }
    </div>
  );
};

export default Game;
