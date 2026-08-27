/* -------------------------------------------------------------------------- */
/*                            CONFIRM ACTION MODAL                            */
/* -------------------------------------------------------------------------- */
import "./ConfirmActionModal.css";
import { useState } from "react";

const ConfirmActionModal = ({ handleModalClose, handleConfirm, message }) => {
  const [error, setError] = useState("");

  const handleSelectNo = () => {
    handleModalClose();
  };

  const handleSelectYes = async () => {
    try {
      setError("");

      await handleConfirm();

      handleModalClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="confirm-modal__container">
      <p className="confirm-modal__text">THIS ACTION CANNOT BE UNDONE</p>
      <p className="confirm-modal__message">{message}</p>
      <div className="confirm-modal__buttons">
        <button
          className="confirm-modal__button confirm-modal__button_red"
          onClick={handleSelectYes}
        >
          YES
        </button>
        <button className="confirm-modal__button" onClick={handleSelectNo}>
          NO
        </button>
      </div>
      <p className="confirm-modal__err-msg">{error}</p>
    </div>
  );
};

export default ConfirmActionModal;
