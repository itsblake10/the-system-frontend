/* -------------------------------------------------------------------------- */
/*                          QUEST-OBJECTIVE SELECTION                         */
/* -------------------------------------------------------------------------- */
import "./QuestObjectiveSelection.css";
import TaskSelectionItem from "../TaskSelectionItem/TaskSelectionItem";

const QuestObjectiveSelection = ({
  data,
  onAddTask,
  onRemoveTask,
  updateTaskGoal,
  onFinish,
  onOpenTaskModal,
  buttonText = "SAVE",
  disabled,
}) => {
  const questSlots = Math.min(
    Math.max(data?.dailyQuests?.taskList?.length + 1, 3),
    5,
  );
  const objectiveSlots = Math.min(
    Math.max(data?.mainObjectives?.taskList?.length + 1, 3),
    5,
  );

  /* --------------------- VALID QUESTS / OBJECTIVES CHECk -------------------- */
  const dailyQuests = data?.dailyQuests.taskList ?? [];
  const mainObjectives = data?.mainObjectives.taskList ?? [];

  const hasEnoughDailyQuests = dailyQuests.length >= 2;

  const validDailyQuests = dailyQuests.every((task) => (task.goal ?? 0) > 0);

  const validMainObjectives =
    mainObjectives.length === 0 ||
    mainObjectives.every((task) => (task.goal ?? 0) > 0);

  const submitButtonDisabled =
    !hasEnoughDailyQuests || !validDailyQuests || !validMainObjectives;

  const isSubmitDisabled = submitButtonDisabled || disabled;

  return (
    <div className="quest-objective-selection">
      <h2 className="quest-objective-selection__title">
        QUESTS AND OBJECTIVES:
      </h2>
      <p className="quest-objective-selection__subtxt">
        Quests and objectives are tasks/exercises which grant the player XP and
        coins upon completion.
      </p>
      <div className="quest-objective-selection__task-container">
        <h3 className="quest-objective-selection__sub-title">DAILY QUESTS</h3>
        <p className="quest-objective-selection__desc">
          Daily tasks that reset every 24 hours, Failing to complete them will
          cause your player to take damage.
        </p>
        <p className="quest-objective-selection__sub-desc">
          Minimum of 2 required.
        </p>
        <div className="quest-objective-selection__list-labels">
          <p className="quest-objective-selection__list-label_task">TASK</p>
          <p className="quest-objective-selection__list-label_goal">GOAL</p>
        </div>
        <ul className="quest-objective-selection__qst-list">
          {Array.from({ length: questSlots }).map((_id, index) => {
            const quest = data.dailyQuests?.taskList[index];
            const isAvailable = index <= data.dailyQuests?.taskList.length;

            return (
              <li
                key={quest?.id ?? index}
                className="quest-objective-selection__qst-item"
              >
                {quest ? (
                  <TaskSelectionItem
                    task={quest}
                    onRemoveTask={onRemoveTask}
                    updateTaskGoal={updateTaskGoal}
                  />
                ) : (
                  <button
                    type="button"
                    className={`quest-objective-selection__add-button ${
                      !isAvailable
                        ? "quest-objective-selection__add-button_disabled"
                        : ""
                    }`}
                    disabled={!isAvailable}
                    onClick={() =>
                      onOpenTaskModal(
                        "quest-list",
                        (quest) => {
                          onAddTask("quest", quest);
                        },
                        data.dailyQuests.taskList,
                        data.mmaMode,
                      )
                    }
                  >
                    +
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        <h3 className="quest-objective-selection__sub-title">
          WEEKLY OBJECTIVES
        </h3>
        <p className="quest-objective-selection__desc">
          Larger more rewarding weekly tasks that reset every 7 days. There is
          no penalty if you don't complete them.
        </p>
        <p className="quest-objective-selection__sub-desc">
          Optional, not required
        </p>
        <div className="quest-objective-selection__list-labels">
          <p className="quest-objective-selection__list-label_task">TASK</p>
          <p className="quest-objective-selection__list-label_goal">GOAL</p>
        </div>
        <ul className="quest-objective-selection__obj-list">
          {Array.from({ length: objectiveSlots }).map((_id, index) => {
            const objective = data.mainObjectives?.taskList[index];
            const isAvailable = index <= data.mainObjectives?.taskList.length;

            return (
              <li
                key={objective?.id ?? index}
                className="quest-objective-selection__qst-item"
              >
                {objective ? (
                  <TaskSelectionItem
                    task={objective}
                    onRemoveTask={onRemoveTask}
                    updateTaskGoal={updateTaskGoal}
                  />
                ) : (
                  <button
                    type="button"
                    className={`quest-objective-selection__add-button ${
                      !isAvailable
                        ? "quest-objective-selection__add-button_disabled"
                        : ""
                    }`}
                    disabled={!isAvailable}
                    onClick={() =>
                      onOpenTaskModal(
                        "objective-list",
                        (objective) => {
                          onAddTask("objective", objective);
                        },
                        data.mainObjectives.taskList,
                        data.mmaMode,
                      )
                    }
                  >
                    +
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <button
        className="quest-objective-selection__submit-button"
        disabled={isSubmitDisabled}
        onClick={onFinish}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default QuestObjectiveSelection;
