import "./Start.css";
import theSystemLogo from "../../../public/the-system-logo.svg";

function Start() {
  return (
    <main className="start">
      <img className="start__logo" src={theSystemLogo} alt="THE SYSTEM Logo" />
      <button className="start__button">START</button>
    </main>
  );
}

export default Start;
