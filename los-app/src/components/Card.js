import React, { useState } from "react";
import attackImage from "../images/attack.png";
import defenseImage from "../images/defense.png";
import rank from "../images/rank.png";
import ava from "../images/ava.png";

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
      className="d-flex justify-content-center align-items-center flex-column"
      style={{
        maxWidth: width,
        height: height,
        position: "relative",
        margin: "20px",
        borderRadius: "15px",
        borderWidth: "4px",
        borderColor: "#10ac84",
        borderStyle: "solid",
        boxShadow: "0 0 1rem 0 #10ac84",
        zIndex: 1,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="d-flex justify-content-center">
        <img
          src={rank}
          alt="Rank"
          style={{
            position: "absolute",
            top: "-50px",
            width: "100px",
            height: "100px",
            zIndex: 2,
          }}
        />
      </div>

      {info ? (
        <>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${card.key}_0.jpg`}
            className="card-img-top"
            style={{ borderRadius: "30px" }}
            alt={card.name}
          />
          {widthNumber >= 15 && (
            <div
              className="card-body"
              style={{
                pposition: "absolute",
                bottom: "0",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                width: "100%",
                borderBottomLeftRadius: "30px",
                borderBottomRightRadius: "30px",
              }}
            >
              <div className="d-flex justify-content-center">
                <img
                  src={ava}
                  alt="Avatar"
                  style={{
                    width: "50px",
                    height: "50px",
                    top: "-25px",
                    position: "absolute",
                    
                  }}
                />
              </div>

              <h4
                className="card-title text-center mt-1"
                style={{
                  fontFamily: "Imbue,serif",
                  color: "#F8EFBA",
                  fontSize: "1.2rem",
                  opacity: "0.8",
                }}
              >
                {card.name}
              </h4>
              <div className="d-flex mx-3 justify-content-around">
                <p
                  className=""
                  style={{
                    color: "#c7ecee",
                    fontFamily: "'Teko', sans-serif",
                    fontSize: "1.5rem",
                  }}
                >
                  <img
                    src={attackImage}
                    alt="Attack"
                    style={{ width: "20px", height: "20px" }}
                  />{" "}
                  {card.info.attack}
                </p>
                <p
                  className=""
                  style={{
                    color: "#c7ecee",
                    fontFamily: "'Teko', sans-serif",
                    fontSize: "1.5rem",
                  }}
                >
                  <img
                    src={defenseImage}
                    alt="Defense"
                    style={{ width: "20px", height: "20px" }}
                  />{" "}
                  {card.info.defense}
                </p>
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