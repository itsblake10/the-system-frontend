/* -------------------------------------------------------------------------- */
/*                         WEEKLY OBJECTIVE LIST MODAL                        */
/* -------------------------------------------------------------------------- */
import "./WeeklyObjectiveListModal.css";
import { weeklyObjectives } from "../../utils/weeklyObjectives";

const WeeklyObjectiveListModal = ({ onClose, onSelectTask }) => {
  const objectives = weeklyObjectives;

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
        {objectives.map((objective) => (
          <li
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
