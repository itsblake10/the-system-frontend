/* -------------------------------------------------------------------------- */
/*                           DAILY QUEST LIST MODAL                           */
/* -------------------------------------------------------------------------- */
import "./DailyQuestListModal.css";
import { getAllDailyQuests } from "../../../api/questObjectiveApi";
import { useState, useEffect } from "react";

const DailyQuestListModal = ({
  onClose,
  onSelectTask,
  selectedQuests,
  mmaMode,
}) => {
  const [quests, setQuests] = useState([]);

  /* -------------------------- FETCH DAILY QUESTS -------------------------- */
  useEffect(() => {
    const fetchDailyQuests = async () => {
      try {
        const dailyQuestData = await getAllDailyQuests();
        setQuests(dailyQuestData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDailyQuests();
  }, []);

  /* ---------------------------- AVAILABLE QUESTS ---------------------------- */
  const availableQuests = quests.filter((quest) => {
    const alreadySelectedQuests = selectedQuests.some(
      (selected) => selected.id === quest.id,
    );

    const hiddenByMmaMode = !mmaMode && quest.mma;

    return !alreadySelectedQuests && !hiddenByMmaMode;
  });

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
        {availableQuests.map((quest) => (
          <li
            key={quest.id}
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
