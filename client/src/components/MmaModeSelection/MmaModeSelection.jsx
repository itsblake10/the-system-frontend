/* -------------------------------------------------------------------------- */
/*                             MMA MODE SELECTION                             */
/* -------------------------------------------------------------------------- */
import "./MmaModeSelection.css";

const MmaModeSelection = ({
  data,
  updateData,
  next,
  buttonText = "SAVE",
  disabled,
}) => {
  return (
    <div className="mma-mode-selection">
      <h2 className="mma-mode-selection__title">MMA MODE:</h2>
      <p className="mma-mode-selection__subtxt">
        MMA mode adds the 'fighting' stat and relevant daily quests and weekly
        objectives, allowing players to track progress in their MMA/fighting
        related sport.
      </p>
      <div className="mma-mode-selection__buttons">
        <button
          className={`mma-mode-selection__button ${data?.mmaMode === true ? "mma-mode-selection__button_selected" : ""}`}
          onClick={() => updateData({ mmaMode: true })}
        >
          YES
          <p className="mma-mode-selection__button-text">
            I do an MMA/fighting sport
          </p>
        </button>
        <button
          className={`mma-mode-selection__button ${data?.mmaMode === false ? "mma-mode-selection__button_selected" : ""}`}
          onClick={() => updateData({ mmaMode: false })}
        >
          NO
          <p className="mma-mode-selection__button-text">
            I do not do an MMA/fighting sport
          </p>
        </button>
      </div>
      <button
        className="mma-mode-selection__submit-button"
        onClick={next}
        disabled={data?.mmaMode === "" || disabled}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default MmaModeSelection;
