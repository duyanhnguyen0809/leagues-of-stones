import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import image from "../images/logo.png";
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(process.env.REACT_APP_GLOBAL_PORT + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const data = await response.json();
      dispatch(login({ token: data.token, name: data.name }));
    }
  };

  return (
    <div
      className="d-flex align-items-start justify-content-center container-fluid flex-column mt-3 ml-3"
      style={{ marginLeft: "100px" }}
    >
      <img src={image} alt="logo" style={{ height: "150px" }}></img>
      <form
        onSubmit={onSubmit}
        className="p-4 bg-dark rounded-2 bg-opacity-75 text-white mt-3"
        style={{
          width: "400px",
          borderColor: "rgba(204, 174, 98, 0.4)",
          borderWidth: "2px",
          borderStyle: "solid",
        }}
      >
        <h2
          className="text-center font-weight-bold"
          style={{
            fontFamily: "'Prata', serif",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          Sign In
        </h2>
        <div className="mb-2 ">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
          >
            Email
          </label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
          >
            Password
          </label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
        </div>
        <div className="mt-4 mb-3 d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-secondary"
            style={{
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            Se connecter
          </button>
        </div>
        <p className="text-center">
          Vous n'avez pas de compte? <Link to={"/signup"}>Inscrivez-vous!</Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
