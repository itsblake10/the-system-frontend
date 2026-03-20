import "./DailyQuests.css";

const DailyQuests = () => {
  return (
    <div className="daily-quests">
      <h2 className="daily-quests__heading">Daily Quest</h2>
      <p className="daily-quests__list-heading">GOAL</p>
      <ul className="daily-quests__list">
        <li className="daily-quests__list-item">
          <span className="daily-quests__quest">Push-ups</span>
          <span className="daily-quests__amount">[0/50]</span>
        </li>
        <li className="daily-quests__list-item">
          <span className="daily-quests__quest">Sit-ups</span>
          <span className="daily-quests__amount">[0/50]</span>
        </li>
        <li className="daily-quests__list-item">
          <span className="daily-quests__quest">Chin-ups</span>
          <span className="daily-quests__amount">[0/30]</span>
        </li>
      </ul>
      <p className="daily-quests__warning">
        WARNING: Failure to complete the daily quests will result in an
        appropriate <span className="daily-quests__penalty-text">penalty</span>
      </p>
      <div className="daily-quests__countdown-container">
        <p className="daily-quests__countdown-text">TIME LEFT:</p>
        <time className="daily-quests__countdown">22:39:41</time>
      </div>
    </div>
  );
};

export default DailyQuests;
