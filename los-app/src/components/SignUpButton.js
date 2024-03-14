import React from "react";
import { Link } from "react-router-dom";
import buttonSingUp from "../images/Inscription.png"


function SignUpButton(props) {

    return (
        <Link to={"/signup"}>
            <button className="btn btn-outline-success ml-2" onClick={props.onClick}>
                    <img
                        src={buttonSingUp}
                        alt="ButtonSignUp"
                        style={{ height: "30px" }}
                    />
            </button>
        </Link>
    );
}
export default SignUpButton;