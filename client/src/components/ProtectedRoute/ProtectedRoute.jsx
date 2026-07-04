/* -------------------------------------------------------------------------- */
/*                          PROTECTED ROUTE COMPONENT                         */
/* -------------------------------------------------------------------------- */
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";

export default function ProtectedRoute({ children }) {
  const { player, token, loading } = useContext(PlayerContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (!player.onboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}
