/* ---------------------------- ONBOARDING ROUTE ---------------------------- */
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";

export default function OnboardingRoute({ children }) {
  const { player, loading, token } = useContext(PlayerContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (player?.onboarding) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
