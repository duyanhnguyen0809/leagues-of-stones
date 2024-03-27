import React from "react";

function Card({card, onClick, width = "15rem", info = true }) {

  return (
    <div
      className="p-0 col-sm-12 col-md-6 col-lg-4 card text-white bg-dark hover-effect card-champion card"
      style={{
        maxWidth: width,
        position: "relative",
        margin: "10px",
      }}
      onClick={onClick}
    >
      {info ? (
        <>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${card.key}_0.jpg`}
            className="card-img-top"
            alt={card.name}
          />
          <div
            className="card-body"
            style={{
              position: "absolute",
              bottom: "0",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              width: "100%",
            }}
          >
            <h4 className="card-title text-center mt-1">{card.name}</h4>
            <div className="d-flex mx-3 justify-content-around">
              <p>Attack: {card.info.attack}</p>
              <p>Defense: {card.info.defense}</p>
              <p>Magic: {card.info.magic}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/11.22.1/img/champion/${card.image.full}`}
            className="card-img-top"
            alt={card.name}
          />
          <h4 className="card-title text-center mt-1">{card.name}</h4>
        </>
      )}
    </div>
  );
}

export default Card;
