import React, { useState } from "react";
import image from "../images/logo.png";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

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
      setMessage("Votre compte a bien été créé");
      setSuccess(true);
      navigate("/signin");
    } else if (response.status === 409) {
      setMessage(
        "L'utilisateur existe déjà dans la base de données (email déjà utilisé)"
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center container-fluid flex-column">
      <img src={image} alt="logo" style={{ height: "200px" }}></img>
      <form
        onSubmit={onSubmit}
        className="p-4 bg-dark rounded-4 bg-opacity-75 text-white"
        style={{
          width: "400px",
          borderColor: "#c7ecee",
          borderWidth: "2px",
          borderStyle: "solid",
        }}
      >
        <div className="mb-3">
          <h2
            className="text-center"
            style={{
              fontFamily: "'Hammersmith One', sans-serif",
              color: "#dff9fb",
              fontSize: "1.5rem",
              textShadow: "0 0 0 #dff9fb",
            }}
          >
            Sign Up
          </h2>
          <hr />
          <label
            htmlFor="exampleInputEmail1"
            className="form-label"
            style={{ color: "#c7ecee" }}
          >
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
          <label
            htmlFor="exampleInputEmail1"
            className="form-label"
            style={{ color: "#c7ecee" }}
          >
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
          <label
            htmlFor="exampleInputEmail1"
            className="form-label"
            style={{ color: "#c7ecee" }}
          >
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
          <label
            htmlFor="exampleInputEmail1"
            className="form-label"
            style={{ color: "#c7ecee" }}
          >
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
        <div className="mt-4 mb-3 d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-danger"
            style={{
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          >
            Valider
          </button>
        </div>
        {success && <p className="text-success text-center">{message}</p>}
        {/*affichage du message d'erreur*/}
        {!success && message && (
          <p className="text-danger text-center">{message}</p>
        )}
        <p className="text-center">
          Vous avez déjà un compte? <Link to={"/signin"} style={{color:"#686de0"}}>Connecter-vous!</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
