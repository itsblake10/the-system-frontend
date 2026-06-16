/* -------------------------------------------------------------------------- */
/*                                SIGN IN PAGE                                */
/* -------------------------------------------------------------------------- */

import "./SignIn.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { getPlayer, login } from "../../api/authApi";
import { PlayerContext } from "../../contexts/PlayerContext";

function SignIn() {
  const navigate = useNavigate();
  const { dispatch, setToken } = useContext(PlayerContext);

  /* ------------------------------- FORM FIELDS ------------------------------ */
  const fields = [
    {
      key: "email",
      label: "Email:",
      type: "email",
      placeholder: "Email...",
      minlength: 5,
      maxlength: 15,
    },
    {
      key: "password",
      label: "Password:",
      type: "password",
      placeholder: "Password...",
    },
  ];
  /* ------------------------------------ . ----------------------------------- */

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      const data = await login(email, password);

      if (!data.token) {
        alert(data.message || "Login Failed");
        return;
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);

      const player = await getPlayer(data.token);

      dispatch({ type: "LOAD_PLAYER", payload: player });

      navigate("/home");
    } catch (err) {
      console.error(err);
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
