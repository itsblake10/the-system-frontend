/* -------------------------------------------------------------------------- */
/*                            ACCOUNT SETTINGS PAGE                           */
/* -------------------------------------------------------------------------- */
import "./Account.css";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import ChangeEmail from "../../components/ChangeEmail/ChangeEmail";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import { deleteAccount } from "../../api/authApi";
import { resetAccount } from "../../api/authApi";

function Account({ onOpenConfirmModal }) {
  const { dispatch, token, logout } = useContext(PlayerContext);

  /* -------------------------- HANDLE DELETE ACCOUNT ------------------------- */
  const handleDeleteAccount = async () => {
    await deleteAccount(token);

    logout();
    navigate("/signin");
  };

  /* -------------------------- HANDLE RESET ACCOUNT -------------------------- */
  const handleResetAccount = async () => {
    const updatedPlayer = await resetAccount(token);

    dispatch({
      type: "LOAD_PLAYER",
      payload: updatedPlayer,
    });
  };

  return (
    <main className="account__page">
      <h1 className="account__title">ACCOUNT</h1>
      <div className="account__container">
        <ChangeEmail />
      </div>
      <div className="account__container">
        <ChangePassword />
      </div>
      <div className="account__buttons">
        <button
          className="account__button account__button_reset"
          onClick={() =>
            onOpenConfirmModal(handleResetAccount, "Reset all progress?")
          }
        >
          RESET ACCOUNT
        </button>
        <button
          className="account__button account__button_delete"
          onClick={() =>
            onOpenConfirmModal(
              handleDeleteAccount,
              "Delete your account permanently?",
            )
          }
        >
          DELETE ACCOUNT
        </button>
      </div>
    </main>
  );
}

export default Account;
