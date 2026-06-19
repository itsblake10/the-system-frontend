/* -------------------------------------------------------------------------- */
/*                             TASK SELECTION ITEM                            */
/* -------------------------------------------------------------------------- */
import "./TaskSelectionItem.css";

const TaskSelectionItem = ({ task, onRemoveTask, updateTaskGoal }) => {
  /* ----------------------- INCREMENT/DECREMENT COUNTER ---------------------- */
  const incrementCounter = () => {
    const amount = task.type === "quest" ? 5 : 1;
    const max = task.type === "quest" ? 100 : 10;

    updateTaskGoal(
      task.id,
      {
        ...task,
        goal: Math.min(task.goal + amount, max),
      },
      task.type,
    );
  };

  const decrementCounter = () => {
    const amount = task.type === "quest" ? 5 : 1;

    updateTaskGoal(
      task.id,
      {
        ...task,
        goal: Math.max(task.goal - amount, 0),
      },
      task.type,
    );
  };

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
        <span className="task-selection__amount">[{task?.goal || 0}]</span>
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
