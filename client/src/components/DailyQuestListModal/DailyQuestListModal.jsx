/* -------------------------------------------------------------------------- */
/*                           DAILY QUEST LIST MODAL                           */
/* -------------------------------------------------------------------------- */
import "./DailyQuestListModal.css";
import { dailyQuests } from "../../utils/dailyQuests";

const DailyQuestListModal = ({ onClose, onSelectTask }) => {
  const quests = dailyQuests;

  /* -------------------------------- ADD TASK -------------------------------- */
  const handleTaskAdd = (task) => {
    onSelectTask(task);
    onClose();
  };

  return (
    <div className="quest-list-modal">
      <p className="quest-list-modal__desc">
        Daily tasks that reset every 24 hours, Failing to complete them will
        cause your player to take damage.
      </p>
      <ul className="quest-list-modal__list">
        {quests.map((quest) => (
          <li
            className="quest-list-modal__item"
            onClick={() => handleTaskAdd(quest)}
          >
            <div className="quest-list-modal__quest">{quest.name}</div>
            <div className="quest-list-modal__stats">
              <p className="quest-list-modal__stats-label">STATS: </p>
              {quest.reward.stats.map((stat) => stat.type).join(", ")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyQuestListModal;
