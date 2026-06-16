/* -------------------------------------------------------------------------- */
/*                                 START PAGE                                 */
/* -------------------------------------------------------------------------- */

import "./Start.css";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

  return (
    <main className="start">
      <button className="start__button" onClick={() => navigate("/signin")}>
        START
      </button>
    </main>
  );
}

export default Start;
