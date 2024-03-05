import React, { useState } from "react";
import image from "../images/LEAGUE-OF-STONES-2-7-2024.png";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    const response = await fetch(process.env.REACT_APP_GLOBAL_PORT + "user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.status === 200) {
      setMessage("Votre compte a bien ete cree");
    } else if (response.status === 409) {
      setMessage(
        "L'utilisateur existe déjà dans la base de données (email déjà utilisé)"
      );
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
            Pseudo
          </label>{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Pseudo"
            required
            className="form-control"
          />
        </div>
        <div class="mb-3">
          {" "}
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>{" "}
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />{" "}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Mot de passe
          </label>{" "}
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Confirmer le mot de passe
          </label>{" "}
          <input
            className="form-control"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmer le mot de passe"
            required
          />
        </div>
        <div className="my-5 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Valider
          </button>
        </div>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default SignUp;
