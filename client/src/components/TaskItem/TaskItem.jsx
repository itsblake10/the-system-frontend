/* -------------------------------------------------------------------------- */
/*                             TASK ITEM COMPONENT                            */
/* -------------------------------------------------------------------------- */
import "./TaskItem.css";

const TaskItem = ({ name, currentAmount, goalAmount }) => {
  return (
    <li className="task-item">
      <span className="task-item__task">{name}</span>
      <div className="task-item__checkbox-container">
        <button className="task-item__decrease-button">-</button>
        <span className="task-item__amount">
          [{currentAmount}/{goalAmount}]
        </span>
        <button className="task-item__increase-button">+</button>
        <input className="task-item__checkbox" type="checkbox" />
      </div>
    </li>
  );
};

export default TaskItem;
