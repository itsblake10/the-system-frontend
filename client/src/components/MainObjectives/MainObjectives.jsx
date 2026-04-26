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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getDaysLeft(player.mainObjectives.nextWeeklyReset));
    }, 1000);

    return () => clearInterval(interval);
  }, [player.mainObjectives.nextWeeklyReset]);

  return (
    <div className="main-objectives">
      <h2 className="main-objectives__heading">Main Objectives</h2>
      <ul className="main-objectives__list">
        {player.mainObjectives.objectiveList.map((task) => (
          <TaskItem
            key={task.id}
            name={task.name}
            currentAmount={task.currentAmount}
            goalAmount={task.goalAmount}
          />
        ))}
      </ul>
      <div className="main-objectives__countdown-container">
        <p className="main-objectives__countdown-text">RESETS IN:</p>
        <time className="main-objectives__countdown">
          <span className="main-objectives__days-left">
            {timeLeft.days} DAYS
          </span>
          {formatTime(timeLeft)}
        </time>
      </div>
    </div>
  );
};

export default MainObjectives;
