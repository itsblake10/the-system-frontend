/* -------------------------------------------------------------------------- */
/*                             TASK ITEM COMPONENT                            */
/* -------------------------------------------------------------------------- */
import "./TaskItem.css";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";

const TaskItem = ({ task, section }) => {
  const { dispatch } = useContext(PlayerContext);

  const incrementCounter = () => {
    dispatch({
      type: "INCREMENT_TASK",
      payload: {
        taskId: task.id,
        section,
      },
    });
  };

  const decrementCounter = () => {
    dispatch({
      type: "DECREMENT_TASK",
      payload: {
        taskId: task.id,
        section,
      },
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
          [{task.currentAmount}/{task.goalAmount}]
        </span>
        <button
          className="task-item__increase-button"
          onClick={incrementCounter}
        >
          +
        </button>
        <input className="task-item__checkbox" type="checkbox" />
      </div>
    </li>
  );
};

export default TaskItem;
