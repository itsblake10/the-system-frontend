/* -------------------------------------------------------------------------- */
/*                             TASK ITEM COMPONENT                            */
/* -------------------------------------------------------------------------- */
import "./TaskSelectionItem.css";
const TaskSelectionItem = ({ task, section, onRemoveTask }) => {
  /* ----------------------- INCREMENT/DECREMENT COUNTER ---------------------- */
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
  /* ------------------------------------ . ----------------------------------- */

  return (
    <div className="task-selection">
      <span className="task-selection__name">{task.name}</span>
      <div className="task-selection__container">
        <button
          className="task-selection__decrease-button"
          onClick={decrementCounter}
        >
          -
        </button>
        <span className="task-selection__amount">[{task?.amount || 0}]</span>
        <button
          className="task-selection__increase-button"
          onClick={incrementCounter}
        >
          +
        </button>
        <button
          className="task-selection__delete"
          onClick={() => onRemoveTask(task.type, task.id)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default TaskSelectionItem;
