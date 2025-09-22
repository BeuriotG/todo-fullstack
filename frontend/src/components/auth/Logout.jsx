import { useNavigate } from "react-router";
export default function Logout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };
  return <button onClick={logout}>Se déconnecter</button>;
}
