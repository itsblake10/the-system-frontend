/* -------------------------------------------------------------------------- */
/*                          MAIN OBJECTIVES COMPONENT                         */
/* -------------------------------------------------------------------------- */

import "./MainObjectives.css";

const MainObjectives = () => {
  return (
    <div className="main-objectives">
      <h2 className="main-objectives__heading">Main Objectives</h2>
      <ul className="main-objectives__list">
        <li className="main-objectives__list-item">
          <span className="main-objectives__objective">Gym Workout</span>
          <div className="main-objectives__checkbox-container">
            <button className="main-objectives__decrease-button">-</button>
            <span className="main-objectives__amount">[0/3]</span>
            <button className="main-objectives__increase-button">+</button>
            <input className="main-objectives__checkbox" type="checkbox" />
          </div>
        </li>

        <li className="main-objectives__list-item">
          <span className="main-objectives__objective">Meditation</span>
          <div className="main-objectives__checkbox-container">
            <button className="main-objectives__decrease-button">-</button>
            <span className="main-objectives__amount">[0/1]</span>
            <button className="main-objectives__increase-button">+</button>
            <input className="main-objectives__checkbox" type="checkbox" />
          </div>
        </li>
      </ul>
      <div className="main-objectives__countdown-container">
        <p className="main-objectives__countdown-text">RESETS IN:</p>
        <time className="main-objectives__countdown">
          <span className="main-objectives__days-left">4 DAYS</span>22:39:41
        </time>
      </div>
    </div>
  );
};

export default MainObjectives;
