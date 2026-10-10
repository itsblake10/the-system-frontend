/* ----------------------------- CHANGE USERNAME ---------------------------- */
import "./ChangeUsername.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useContext, useState } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { validateChangeUsername } from "../../validation/validateChangeUsername";
import { changeUsername } from "../../api/playerApi";

const ChangeUsername = () => {
  const { player, dispatch, token } = useContext(PlayerContext);
  const [errors, setErrors] = useState({});

  const fields = [
    {
      key: "newUsername",
      label: "New Username:",
      type: "text",
      placeholder: "New Username...",
    },
  ];

  /* -------------------------------- FORM DATA ------------------------------- */
  const [formData, setFormData] = useState({
    newUsername: "",
  });

  /* -------------------------- USERNAME CHANGE CHECK ------------------------- */
  const usernameChanged =
    formData.newUsername.toLowerCase().trim() !== "" &&
    formData.newUsername.toLowerCase().trim() !==
      player.playerInformation.username.toLowerCase();

  /* ------------------------------ HANDLE CHANGE ----------------------------- */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ------------------------------ HANDLE SUBMIT ----------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateChangeUsername(
      formData,
      player?.playerInformation.username,
    );

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const updatedPlayer = await changeUsername(token, formData.newUsername);

      dispatch({
        type: "LOAD_PLAYER",
        payload: {
          ...player,
          playerInformation: {
            ...player.playerInformation,
            username: updatedPlayer.username,
          },
        },
      });

      setFormData({
        newUsername: "",
      });
    } catch (err) {
      setErrors({
        api: err.message,
      });
    }
  };

  return (
    <div className="change-username__container">
      <h2 className="change-username__title">CHANGE USERNAME</h2>
      <div className="change-username__current">
        <p className="change-username__current-txt">Current Username:</p>
        <span className="change-username__current-user">
          {player?.playerInformation.username}
        </span>
      </div>
      <AuthForm
        title=""
        fields={fields}
        formName="Change Username"
        formData={formData}
        buttonText="SAVE"
        onSubmit={handleSubmit}
        onChange={handleChange}
        errors={errors}
        variant="settings"
        disabled={!usernameChanged}
      />
    </div>
  );
};

export default ChangeUsername;
