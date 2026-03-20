import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ title, children, onClose }) => {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onClose]);

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close-button" onClick={onClose}>
          X
        </button>
        <h2 className="modal__title">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
