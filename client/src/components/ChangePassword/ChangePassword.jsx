/* -------------------------------------------------------------------------- */
/*                                CHANGE EMAIL                                */
/* -------------------------------------------------------------------------- */
import "./ChangePassword.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useContext, useState } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { validateChangePassword } from "../../validation/validateChangePassword";
import { changePassword } from "../../api/authApi";

const ChangePassword = () => {
  const { token } = useContext(PlayerContext);
  const [errors, setErrors] = useState({});

  const fields = [
    {
      key: "currentPassword",
      label: "Current Password:",
      type: "password",
      placeholder: "Current Password...",
    },
    {
      key: "newPassword",
      label: "New Password:",
      type: "password",
      placeholder: "New Password...",
    },
  ];

  /* -------------------------------- FORM DATA ------------------------------- */
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  /* -------------------------- BUTTON DISABLED CHECK ------------------------- */

  const passwordEntered =
    formData.currentPassword.trim() !== "" &&
    formData.newPassword.trim() !== "";

  const submitDisabled = !passwordEntered;

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

    const newErrors = validateChangePassword(formData);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await changePassword(
        token,
        formData.currentPassword,
        formData.newPassword,
      );

      setFormData({
        currentPassword: "",
        newPassword: "",
      });
    } catch (err) {
      setErrors({
        api: err.message,
      });
    }
  };

  return (
    <div className="change-password__container">
      <h2 className="change-password__title">CHANGE PASSWORD</h2>
      <AuthForm
        title=""
        fields={fields}
        formName="Change Password"
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

export default ChangePassword;
