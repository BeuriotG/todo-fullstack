import { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    const token = await login(email, password);
    if (!token) {
      throw new Error("Le login a rencontré un problème");
    } else {
      setEmail("");
      setPassword("");
      navigate("/");
    }
  };
  return (
    <section className="section-login-form">
      <h2>Veuillez vous authentifier</h2>
      <h2>Formulaire d'authentification</h2>
      <form onSubmit={handlelogin} className="login-form">
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
        <button type="submit">Valider le formulaire</button>
      </form>
      <a href="/auth/signup">Vous n'avez pas de compte? </a>
    </section>
  );
}
