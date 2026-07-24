/* -------------------------------------------------------------------------- */
/*                                CHANGE EMAIL                                */
/* -------------------------------------------------------------------------- */
import "./ChangeEmail.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useContext, useState } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { validateChangeEmail } from "../../validation/validateChangeEmail";
import { changeEmail } from "../../api/authApi";

const ChangeEmail = () => {
  const { user, setUser, token } = useContext(PlayerContext);
  const [errors, setErrors] = useState({});

  const fields = [
    {
      key: "newEmail",
      label: "New Email:",
      type: "text",
      placeholder: "New Email...",
    },
    {
      key: "password",
      label: "Password:",
      type: "password",
      placeholder: "Password...",
    },
  ];

  /* -------------------------------- FORM DATA ------------------------------- */
  const [formData, setFormData] = useState({
    newEmail: "",
    password: "",
  });

  /* -------------------------- BUTTON DISABLED CHECK ------------------------- */
  const emailChanged =
    formData.newEmail.trim().toLowerCase() !== "" &&
    formData.newEmail.trim().toLowerCase() !== user?.email?.toLowerCase();

  const passwordEntered = formData.password.trim() !== "";

  const submitDisabled = !emailChanged || !passwordEntered;

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

    const newErrors = validateChangeEmail(formData, user.email);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const updatedUser = await changeEmail(
        token,
        formData.newEmail,
        formData.password,
      );

      setUser(updatedUser);

      setFormData({
        newEmail: "",
        password: "",
      });
    } catch (err) {
      setErrors({
        api: err.message,
      });
    }
  };

  return (
    <div className="change-email__container">
      <h2 className="change-email__title">CHANGE EMAIL</h2>
      <div className="change-email__current">
        <p className="change-email__current-txt">Current Email:</p>
        <span className="change-email__current-email">{user?.email}</span>
      </div>
      <AuthForm
        title=""
        fields={fields}
        formName="Change Email"
        formData={formData}
        buttonText="SAVE"
        onSubmit={handleSubmit}
        onChange={handleChange}
        errors={errors}
        variant="settings"
        disabled={submitDisabled}
      />
    </div>
  );
};

export default ChangeEmail;
