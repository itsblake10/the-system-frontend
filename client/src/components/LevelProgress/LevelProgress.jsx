/* -------------------------------------------------------------------------- */
/*                          LEVEL PROGRESS COMPONENT                          */
/* -------------------------------------------------------------------------- */

import "./LevelProgress.css";

const LevelProgress = () => {
  return (
    <div className="level-progress">
      <h2 className="level-progress__heading">NEXT LEVEL</h2>
      <div className="level-progress__container">
        <div className="level-progress__level-container">
          <p className="level-progress__level">13</p>
          <p className="level-progress__level">14</p>
        </div>
        <div className="level-progress__bar">
          <span className="level-progress__bar-level"></span>
        </div>
        <p className="level-progress__xp">
          XP: <span className="level-progress__xp-amount">1268 / 1247</span>
        </p>
      </div>
      <h3 className="level-progress__reward-title">NEXT LEVEL REWARDS:</h3>
      <ul className="level-progress__reward-list">
        <li className="level-progress__reward-list-item"></li>
      </ul>
    </div>
  );
};

export default LevelProgress;
