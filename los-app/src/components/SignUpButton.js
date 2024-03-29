import React from "react";
import { Link } from "react-router-dom";

function SignUpButton(props) {
  return (
    <Link to={"/signup"}>
      <button
        className="btn btn-outline-success ml-2"
        style={{
          width: "100%",
          backgroundColor: "black",
          borderColor: "#7ed6df",
          color: "#7ed6df",
          textShadow: "0 0 2rem #27ae60 0",
          fontFamily: "'Russo One', serif",
          fontWeight: "400",
          fontOpticalSizing: "auto",
          fontStyle: "normal",
          textDecoration: "none",
        }}
        onClick={props.onClick}
      >
        S'inscrire
      </button>
    </Link>
  );
}
export default SignUpButton;
