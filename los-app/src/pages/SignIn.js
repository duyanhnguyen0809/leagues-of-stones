import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../features/authSlice";
import image from "../images/LEAGUE-OF-STONES-2-7-2024.png";
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
      dispatch(setToken(data.token));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center container-fluid flex-column">
      <img src={image} alt="logo" style={{ height: "300px" }}></img>
      <form
        onSubmit={onSubmit}
        className="p-4 bg-dark rounded-4 bg-opacity-75 text-white"
        style={{ width: "400px" }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
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
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Mot de passe
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
        <div className="my-5 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Se connecter
          </button>
        </div>
      <p className="text-center">Vous n'avez pas de compte, inscrivez-vous <Link to={"/signup"}>ICI</Link></p>
      </form>
    </div>
  );
}

export default SignIn;
