import React, { useState } from "react";

function Card({
  card,
  onClick,
  width = "15rem",
  info = true,
  height = "auto",
  showTooltip = false,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Convert the width to a number for comparison
  const widthNumber = Number(width.replace("rem", ""));
  const heightNumber = Number(height.replace("rem", ""));
  return (
    <div
      className="p-0 col-sm-12 col-md-6 col-lg-4 card text-white bg-dark hover-effect card-champion card"
      style={{
        maxWidth: width,
        height: height,
        position: "relative",
        margin: "10px",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {info ? (
        <>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${card.key}_0.jpg`}
            className="card-img-top"
            alt={card.name}
          />
          {widthNumber >= 15 && (
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
              </div>
            </div>
          )}
        </>
      ) : (
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/11.22.1/img/champion/${card.image.full}`}
          className="card-img-top"
          alt={card.name}
        />
      )}
      {showTooltip && isHovered && (
        <div style={tooltipStyle}>
          Attack: {card.info.attack}, Defense: {card.info.defense}
        </div>
      )}
    </div>
  );
}

const tooltipStyle = {
  position: "absolute",
  bottom: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "black",
  color: "white",
  padding: "5px",
  borderRadius: "5px",
  zIndex: 1,
};

export default Card;