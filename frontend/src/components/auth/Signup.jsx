import { useState } from "react";
import { signup } from "../../api/auth";
import { useNavigate } from "react-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerif, setPasswordVerif] = useState("");
  const [messageSignup, setMessageSignUp] = useState(
    "En attente d'envoi formulaire"
  );
  const navigate = useNavigate();

  const handlesignup = async (e) => {
    e.preventDefault();
    if (password !== passwordVerif) {
      setPassword("");
      setPasswordVerif("");
      return setMessageSignUp("Mot de passe différents");
    } else {
      const message = await signup(email, password);
      setMessageSignUp(message);
      setEmail("");
      setPassword("");
      setPasswordVerif("");

      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    }
  };
  return (
    <section>
      <h2>Veuillez créer un compte</h2>
      <h2>Formulaire d'inscription</h2>
      <form onSubmit={handlesignup} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="mot de passe"
        />
        <input
          type="password"
          value={passwordVerif}
          onChange={(e) => setPasswordVerif(e.target.value)}
          required
          placeholder="vérification de mot de passe"
        />
        <button type="submit">Valider le formulaire</button>
      </form>
      <h3>
        Votre status d'inscription: <br />
        {messageSignup}
      </h3>
    </section>
  );
}
