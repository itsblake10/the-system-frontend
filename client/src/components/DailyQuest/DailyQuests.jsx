/* -------------------------------------------------------------------------- */
/*                           DAILY QUESTS COMPONENT                           */
/* -------------------------------------------------------------------------- */

import "./DailyQuests.css";
import dailyQuestsHeadingIcon from "../../../public/daily-quests-heading-icon.svg";

const DailyQuests = () => {
  return (
    <div className="daily-quests">
      <div className="daily-quests__heading-container">
        <img
          className="daily-quests__heading-icon"
          src={dailyQuestsHeadingIcon}
        />
        <h2 className="daily-quests__heading">Daily Quest</h2>
      </div>
      <h3 className="daily-quests__list-heading">GOAL</h3>
      <ul className="daily-quests__list">
        <li className="daily-quests__list-item">
          <span className="daily-quests__quest">Push-ups</span>
          <div className="daily-quests__checkbox-container">
            <button className="daily-quests__decrease-button">-</button>
            <span className="daily-quests__amount">[0/50]</span>
            <button className="daily-quests__increase-button">+</button>
            <input className="daily-quests__checkbox" type="checkbox" />
          </div>
        </li>
        <li className="daily-quests__list-item">
          <span className="daily-quests__quest">Sit-ups</span>
          <div className="daily-quests__checkbox-container">
            <button className="daily-quests__decrease-button">-</button>
            <span className="daily-quests__amount">[0/50]</span>
            <button className="daily-quests__increase-button">+</button>
            <input className="daily-quests__checkbox" type="checkbox" />
          </div>
        </li>
        <li className="daily-quests__list-item">
          <span className="daily-quests__quest">Chin-ups</span>
          <div className="daily-quests__checkbox-container">
            <button className="daily-quests__decrease-button">-</button>
            <span className="daily-quests__amount">[0/30]</span>
            <button className="daily-quests__increase-button">+</button>
            <input className="daily-quests__checkbox" type="checkbox" />
          </div>
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
