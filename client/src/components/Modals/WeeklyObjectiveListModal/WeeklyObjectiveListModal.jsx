/* -------------------------------------------------------------------------- */
/*                         WEEKLY OBJECTIVE LIST MODAL                        */
/* -------------------------------------------------------------------------- */
import "./WeeklyObjectiveListModal.css";
import { mainObjectives } from "../../../utils/mainObjectives";

const WeeklyObjectiveListModal = ({
  onClose,
  onSelectTask,
  selectedObjectives,
  mmaMode,
}) => {
  const objectives = mainObjectives;

  /* -------------------------- AVAILABLE OBJECTIVES -------------------------- */
  const availableObjectives = objectives.filter((objective) => {
    const alreadySelectedObjectives = selectedObjectives.some(
      (selected) => selected.id === objective.id,
    );

    const hiddenByMmaMode = !mmaMode && objective.mma;

    return !alreadySelectedObjectives && !hiddenByMmaMode;
  });

  /* -------------------------------- ADD TASK -------------------------------- */
  const handleTaskAdd = (task) => {
    onSelectTask(task);
    onClose();
  };

  return (
    <div className="objective-list-modal">
      <p className="objective-list-modal__desc">
        Daily tasks that reset every 24 hours, Failing to complete them will
        cause your player to take damage.
      </p>
      <ul className="objective-list-modal__list">
        {availableObjectives.map((objective) => (
          <li
            key={objective.id}
            className="objective-list-modal__item"
            onClick={() => handleTaskAdd(objective)}
          >
            <div className="objective-list-modal__quest">{objective.name}</div>
            <div className="objective-list-modal__stats">
              <p className="objective-list-modal__stats-label">STATS: </p>
              {objective.reward.stats.map((stat) => stat.type).join(", ")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyObjectiveListModal;
