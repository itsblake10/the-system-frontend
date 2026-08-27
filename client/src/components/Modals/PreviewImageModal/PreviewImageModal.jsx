/* -------------------------------------------------------------------------- */
/*                             PREVIEW IMAGE MODAL                            */
/* -------------------------------------------------------------------------- */
import "./PreviewImageModal.css";
import { useContext } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";

const PreviewImageModal = () => {
  const { player } = useContext(PlayerContext) || {};

  return (
    <div className="preview-img-modal">
      <img
        className="preview-img-modal__image"
        src={player.playerInformation.avatar}
        alt="Image Preview"
      />
    </div>
  );
};

export default PreviewImageModal;
