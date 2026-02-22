import "./PlayerProfile.css";
import exampleProfileImage from "../../../public/example-profile-image.png";
import manaIcon from "../../../public/mana-icon.svg";
import hpIcon from "../../../public/hp-icon.svg";

const PlayerProfile = () => {
  return (
    <div className="player-profile">
      <div className="player-profile__left-container">
        <p className="player-profile__level-label">
          LEVEL [<span className="player-profile__level">13</span>]
        </p>
        <div className="player-profile__image-container">
          <img className="player-profile__image" src={exampleProfileImage} />
        </div>
      </div>

      <div className="player-profile__right-container">
        <div className="player-profile__info">
          <p className="player-profile__info-label">
            Username:{" "}
            <span className="player-profile__info-text">player_one</span>
          </p>
          <p className="player-profile__info-label">
            Title:{" "}
            <span className="player-profile__info-text">Assassin Warrior</span>
          </p>
          <p className="player-profile__info-label">
            Job: <span className="player-profile__info-text">Defender</span>
          </p>
        </div>

        <div className="player-profile__status">
          <div className="player-profile__hp">
            <img className="player-profile__hp-icon" src={hpIcon} />
            <div className="player-profile__hp-container">
              <div className="player-profile__hp-text">
                <p className="player-profile__status-label">HP</p>
                <p className="player-profile__status-text">100/100</p>
              </div>
              <div className="player-profile__hp-bar">
                <span className="player-profile__hp-bar-level"></span>
              </div>
            </div>
          </div>

          <div className="player-profile__mp">
            <img className="player-profile__mp-icon" src={manaIcon} />
            <div className="player-profile__mp-container">
              <div className="player-profile__mp-text">
                <p className="player-profile__status-label">MP</p>
                <p className="player-profile__status-text">50/50</p>
              </div>
              <div className="player-profile__mp-bar">
                <span className="player-profile__mp-bar-level"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
