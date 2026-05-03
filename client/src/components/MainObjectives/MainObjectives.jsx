/* -------------------------------------------------------------------------- */
/*                          MAIN OBJECTIVES COMPONENT                         */
/* -------------------------------------------------------------------------- */
import "./MainObjectives.css";
import { useContext, useState, useEffect } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import TaskItem from "../TaskItem/TaskItem";
import { getDaysLeft, formatTime } from "../../utils/dateResets";

const MainObjectives = () => {
  const { player } = useContext(PlayerContext);
  const [timeLeft, setTimeLeft] = useState(
    getDaysLeft(player.mainObjectives.nextWeeklyReset),
  );

  /* ---------------------------- SET WEEKLY RESET ---------------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getDaysLeft(player.mainObjectives.nextWeeklyReset));
    }, 1000);

    return () => clearInterval(interval);
  }, [player.mainObjectives.nextWeeklyReset]);
  /* ------------------------------------ . ----------------------------------- */

  return (
    <div className="main-objectives">
      <h2 className="main-objectives__heading">Main Objectives</h2>
      <ul className="main-objectives__list">
        {player.mainObjectives.taskList.map((task) => (
          <TaskItem key={task.id} task={task} section="mainObjectives" />
        ))}
      </ul>
      <div className="main-objectives__countdown-container">
        <p className="main-objectives__countdown-text">RESETS IN:</p>
        <time className="main-objectives__countdown">
          <span
            className={
              timeLeft.days === 0
                ? "main-objectives__days-left main-objectives__days-left_red"
                : "main-objectives__days-left"
            }
          >
            {timeLeft.days} DAYS
          </span>
          <span className="main-objectives__time-left">
            {formatTime(timeLeft)}
          </span>
        </time>
      </div>
    </div>
  );
};

export default MainObjectives;
