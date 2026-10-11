/* -------------------------------------------------------------------------- */
/*                             TASK ITEM COMPONENT                            */
/* -------------------------------------------------------------------------- */
import "./TaskItem.css";
import { useContext, useRef, useEffect } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import {
  updateDailyQuestProgress,
  updateMainObjectiveProgress,
} from "../../api/playerApi";

const TaskItem = ({ task, section }) => {
  const { dispatch, token } = useContext(PlayerContext) || {};

  const holdTimeout = useRef(null);
  const holdInterval = useRef(null);
  const isHolding = useRef(false);
  const currentAmount = useRef(task.amount ?? 0);
  const requestInProgress = useRef(false);

  useEffect(() => {
    currentAmount.current = task.amount ?? 0;
  }, [task.amount]);

  const isComplete = (task.amount ?? 0) >= task.goal;
  const isZero = (task.amount ?? 0) <= 0;

  const stopHolding = () => {
    isHolding.current = false;
    clearTimeout(holdTimeout.current);
    clearInterval(holdInterval.current);
    holdTimeout.current = null;
    holdInterval.current = null;
  };

  /* ----------------------------- UPDATE PROGRESS ---------------------------- */
  const updateCounter = async (direction) => {
    if (requestInProgress.current) return;

    const previousAmount = currentAmount.current;
    const nextAmount = Math.max(
      0,
      Math.min(previousAmount + direction, task.goal),
    );

    if (nextAmount === previousAmount) {
      if (nextAmount >= task.goal) stopHolding();
      return;
    }

    currentAmount.current = nextAmount;
    requestInProgress.current = true;

    try {
      const updatedPlayer =
        section === "dailyQuests"
          ? await updateDailyQuestProgress(token, task.id, nextAmount)
          : await updateMainObjectiveProgress(token, task.id, nextAmount);

      dispatch({
        type: "LOAD_PLAYER",
        payload: updatedPlayer,
      });

      if (nextAmount >= task.goal) stopHolding();
    } catch (error) {
      console.error("Failed to update task progress:", error);

      currentAmount.current = previousAmount;
      stopHolding();
    } finally {
      requestInProgress.current = false;
    }
  };

  /* ------------------------------ HOLD TO ADD ------------------------------- */
  const startHolding = (event) => {
    if (event.button !== 0 || isHolding.current) return;

    isHolding.current = true;

    updateCounter(1);

    holdTimeout.current = setTimeout(() => {
      if (!isHolding.current) return;

      holdInterval.current = setInterval(() => {
        if (!isHolding.current) return;

        updateCounter(1);
      }, 200);
    }, 400);
  };

  /* ------------------------------ HOLD TO SUBTRACT -------------------------- */
  const startDecrementHolding = (event) => {
    if (event.button !== 0 || isHolding.current) return;

    isHolding.current = true;

    updateCounter(-1);

    holdTimeout.current = setTimeout(() => {
      if (!isHolding.current) return;

      holdInterval.current = setInterval(() => {
        if (!isHolding.current) return;

        updateCounter(-1);
      }, 200);
    }, 400);
  };

  useEffect(() => {
    return () => {
      clearTimeout(holdTimeout.current);
      clearInterval(holdInterval.current);
    };
  }, []);

  return (
    <li className="task-item">
      <span className="task-item__task">{task.name}</span>

      <div className="task-item__checkbox-container">
        <button
          className="task-item__decrease-button"
          onPointerDown={startDecrementHolding}
          onPointerUp={stopHolding}
          onPointerLeave={stopHolding}
          onPointerCancel={stopHolding}
          onContextMenu={(event) => event.preventDefault()}
          disabled={isZero}
        >
          -
        </button>

        <span className="task-item__amount">
          [{task.amount ?? 0}/{task.goal}]
        </span>

        <button
          className="task-item__increase-button"
          onPointerDown={startHolding}
          onPointerUp={stopHolding}
          onPointerLeave={stopHolding}
          onPointerCancel={stopHolding}
          onContextMenu={(event) => event.preventDefault()}
          disabled={isComplete}
        >
          +
        </button>

        <input className="task-item__checkbox" type="checkbox" />

        <img
          className={
            isComplete
              ? "task-item__checkmark task-item__checkmark_enabled"
              : "task-item__checkmark"
          }
          src="/checkmark.svg"
          alt=""
        />
      </div>
    </li>
  );
};

export default TaskItem;
