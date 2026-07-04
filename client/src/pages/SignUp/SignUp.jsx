/* -------------------------------------------------------------------------- */
/*                                SIGN UP PAGE                                */
/* -------------------------------------------------------------------------- */
import "./SignUp.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { signup } from "../../api/authApi";
import { PlayerContext } from "../../contexts/PlayerContext";
import { validateSignup } from "../../validation/validateSignup";

function SignUp() {
  const navigate = useNavigate();
  const { setToken } = useContext(PlayerContext) || {};
  const [errors, setErrors] = useState({});

  /* ------------------------------- FORM FIELDS ------------------------------ */
  const fields = [
    {
      key: "username",
      label: "Username:",
      type: "text",
      placeholder: "Username...",
      required: true,
      minlength: 4,
      maxlength: 15,
    },
    {
      key: "email",
      label: "Email:",
      type: "email",
      placeholder: "Email...",
      required: true,
    },
    {
      key: "confirmEmail",
      label: "Confirm Email:",
      type: "email",
      placeholder: "confirm Email...",
    },
    {
      key: "password",
      label: "Password:",
      type: "password",
      placeholder: "Password...",
      minlength: 8,
      required: true,
    },
    {
      key: "confirmPassword",
      label: "Confirm Password:",
      type: "password",
      placeholder: "Confirm Password...",
    },
  ];

  /* -------------------------------- FORM DATA ------------------------------- */
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
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

    const newErrors = validateSignup(formData);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const { username, email, password } = formData;

    try {
      const data = await signup(email, password, username);

      setToken(data.token);

      localStorage.setItem("token", data.token);

      navigate("/onboarding");
    } catch (err) {
      setErrors({ api: err.message });
    }
  };

  return (
    <main className="signup">
      <div className="signup-form__container">
        <button
          className="signup-form__exit-button"
          onClick={() => navigate("/")}
        >
          X
        </button>
        <AuthForm
          title="SIGN UP"
          fields={fields}
          formName="Sign Up"
          formData={formData}
          buttonText="ENTER SYSTEM"
          onSubmit={handleSubmit}
          onChange={handleChange}
          errors={errors}
        />
      </div>
      <div className="signup-form__footer">
        <p className="signup-form__footer-text">Already have an Account?</p>
        <a
          className="signup-form__footer-link"
          onClick={() => navigate("/signin")}
        >
          Sign in
        </a>
      </div>
    </main>
  );
}

export default SignUp;
