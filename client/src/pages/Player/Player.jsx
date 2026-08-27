/* -------------------------------------------------------------------------- */
/*                            PLAYER SETTINGS PAGE                            */
/* -------------------------------------------------------------------------- */
import "./Player.css";
import { useContext, useState, useRef } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import ChangeUsername from "../../components/ChangeUsername/ChangeUsername";
import { changeAvatar, changeTitle } from "../../api/authApi";

function Player({ onOpenPreviewImage }) {
  const { player, token, dispatch } = useContext(PlayerContext);

  /* -------------------------- CHANGE PLAYER TITLES -------------------------- */
  const [selectedTitle, setSelectedTitle] = useState(
    player.playerInformation.title ?? "Unassigned",
  );

  const playerTitles = player.playerTitles ?? [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTitle = await changeTitle(token, selectedTitle);

    dispatch({
      type: "UPDATE_PLAYER_INFO",
      payload: {
        title: updatedTitle.title,
      },
    });
  };

  /* -------------------------- CHANGE PLAYER AVATAR -------------------------- */
  const fileInputRef = useRef(null);

  const handleChangeClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const data = await changeAvatar(token, file);

    dispatch({
      type: "UPDATE_PLAYER_INFO",
      payload: {
        avatar: data.avatar,
      },
    });
  };

  return (
    <main className="player__page">
      <h1 className="player__title">PLAYER</h1>
      <div className="player__change-pfp-container">
        <h2 className="player__change-pfp-title">CHANGE PROFILE IMAGE</h2>
        <div className="player__change-pfp">
          <div className="player__change-pfp-img-container">
            <img
              className="player__change-pfp-img"
              src={player.playerInformation.avatar}
            />
          </div>
          <div className="player__change-pfp-buttons">
            <button
              className="player__change-pfp-button"
              onClick={onOpenPreviewImage}
            >
              VIEW
            </button>
            <button
              className="player__change-pfp-button"
              onClick={handleChangeClick}
            >
              CHANGE
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </div>
      </div>

      <ChangeUsername />

      <div className="player__title-container">
        <h2 className="player__title-title">CHANGE TITLE</h2>
        <form name="Change Title" onSubmit={handleSubmit}>
          <select
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            className="player__title-select"
          >
            {playerTitles.length === 0 ? (
              <option value="Unassigned">Unassigned</option>
            ) : (
              playerTitles.map((title) => (
                <option
                  className="player__title-option"
                  key={title}
                  value={title}
                >
                  {title}
                </option>
              ))
            )}
          </select>
          <button
            className="player__title-submit"
            type="submit"
            disabled={selectedTitle === player.playerInformation.title}
          >
            SAVE
          </button>
        </form>
      </div>
    </main>
  );
}

export default Player;
