/* -------------------------------------------------------------------------- */
/*                             TASK ITEM COMPONENT                            */
/* -------------------------------------------------------------------------- */
import "./TaskItem.css";
import checkmark from "../../../public/checkmark.svg";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import {
  updateDailyQuestProgress,
  updateMainObjectiveProgress,
} from "../../api/playerApi";

const TaskItem = ({ task, section }) => {
  const { dispatch, token } = useContext(PlayerContext) || {};

  /* ----------------------------- INCREMENT TASK ----------------------------- */
  const incrementCounter = async () => {
    const updatedPlayer =
      section === "dailyQuests"
        ? await updateDailyQuestProgress(token, task.id, task.amount + 1)
        : await updateMainObjectiveProgress(token, task.id, task.amount + 1);

    dispatch({
      type: "LOAD_PLAYER",
      payload: updatedPlayer,
    });
  };

  /* ----------------------------- DECREMENT TASK ----------------------------- */
  const decrementCounter = async () => {
    const updatedPlayer =
      section === "dailyQuests"
        ? await updateDailyQuestProgress(token, task.id, task.amount - 1)
        : await updateMainObjectiveProgress(token, task.id, task.amount - 1);

    dispatch({
      type: "LOAD_PLAYER",
      payload: updatedPlayer,
    });
  };

  return (
    <li className="task-item">
      <span className="task-item__task">{task.name}</span>
      <div className="task-item__checkbox-container">
        <button
          className="task-item__decrease-button"
          onClick={decrementCounter}
        >
          -
        </button>
        <span className="task-item__amount">
          [{task.amount ?? 0}/{task.goal}]
        </span>
        <button
          className="task-item__increase-button"
          onClick={incrementCounter}
        >
          +
        </button>
        <input className="task-item__checkbox" type="checkbox" />
        <img
          className={
            task.amount === task.goal
              ? "task-item__checkmark task-item__checkmark_enabled"
              : "task-item__checkmark"
          }
          src={checkmark}
        />
      </div>
    </li>
  );
};

export default TaskItem;
