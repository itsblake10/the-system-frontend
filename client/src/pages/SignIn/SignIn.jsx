/* -------------------------------------------------------------------------- */
/*                                SIGN IN PAGE                                */
/* -------------------------------------------------------------------------- */

import "./SignIn.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { getPlayer, login } from "../../api/authApi";
import { PlayerContext } from "../../contexts/PlayerContext";
import { validateSignin } from "../../validation/validateSignin";

function SignIn() {
  const navigate = useNavigate();
  const { dispatch, setToken } = useContext(PlayerContext) || {};
  const [errors, setErrors] = useState({});

  /* ------------------------------- FORM FIELDS ------------------------------ */
  const fields = [
    {
      key: "email",
      label: "Email:",
      type: "email",
      placeholder: "Email...",
      required: true,
    },
    {
      key: "password",
      label: "Password:",
      type: "password",
      placeholder: "Password...",
      required: true,
    },
  ];

  /* -------------------------------- FORM DATA ------------------------------- */
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

    const { email, password } = formData;

    const newErrors = validateSignin(formData);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      setToken(data.token);

      const player = await getPlayer(data.token);

      dispatch({ type: "LOAD_PLAYER", payload: player });

      navigate("/home");
    } catch (err) {
      setErrors({
        api: err.message,
      });
    }
  };

  return (
    <main className="signin">
      <div className="signin-form__container">
        <button
          className="signin-form__exit-button"
          onClick={() => navigate("/")}
        >
          X
        </button>
        <AuthForm
          title="SIGN IN"
          fields={fields}
          formName="Sign In"
          formData={formData}
          buttonText="ENTER SYSTEM"
          onSubmit={handleSubmit}
          onChange={handleChange}
          errors={errors}
        />
      </div>
      <div className="signin-form__footer">
        <p className="signin-form__footer-text">Don't have an Account?</p>
        <a
          className="signin-form__footer-link"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </a>
      </div>
    </main>
  );
}

export default SignIn;
