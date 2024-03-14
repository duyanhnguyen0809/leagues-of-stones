import React from "react";
import { Link } from "react-router-dom";
import buttonLogin from "../images/Se-Connecter.png";

function SignInButton(props) {
    return (
        <Link to={"/signin"}>
            <button className="btn btn-outline-success ml-2" onClick={props.onClick}>
                <img
                    src={buttonLogin}
                    alt="ButtonSignin"
                    style={{ height: "30px" }}
                />
            </button>
        </Link>
    );
}
export default SignInButton;