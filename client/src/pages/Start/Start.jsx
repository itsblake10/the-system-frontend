import "./Start.css";
import theSystemLogo from "../../../public/the-system-logo.svg";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

  return (
    <main className="start">
      <img className="start__logo" src={theSystemLogo} alt="THE SYSTEM Logo" />
      <button className="start__button" onClick={() => navigate("/signin")}>
        START
      </button>
    </main>
  );
}

export default Start;
