/* -------------------------------------------------------------------------- */
/*                             PREVIEW IMAGE MODAL                            */
/* -------------------------------------------------------------------------- */
import "./PreviewImageModal.css";
import exampleProfileImage from "../../public/example-profile-image.png";

const PreviewImageModal = () => {
  return (
    <div className="preview-img-modal__container">
      <img className="preview-img-modal__image" src={exampleProfileImage} />
    </div>
  );
};

export default PreviewImageModal;
