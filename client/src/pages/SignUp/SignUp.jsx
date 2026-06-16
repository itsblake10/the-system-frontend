/* -------------------------------------------------------------------------- */
/*                                SIGN UP PAGE                                */
/* -------------------------------------------------------------------------- */
import "./SignUp.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { signup } from "../../api/authApi";
import { PlayerContext } from "../../contexts/PlayerContext";

function SignUp() {
  const navigate = useNavigate();
  const { setToken } = useContext(PlayerContext);

  /* ------------------------------- FORM FIELDS ------------------------------ */
  const fields = [
    {
      key: "username",
      label: "Username:",
      type: "text",
      placeholder: "Username...",
      minlength: 5,
      maxlength: 15,
    },
    { key: "email", label: "Email:", type: "email", placeholder: "Email..." },
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
    },
    {
      key: "confirmPassword",
      label: "Confirm Password:",
      type: "password",
      placeholder: "Confirm Password...",
    },
  ];
  /* ------------------------------------ . ----------------------------------- */

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, confirmEmail, password, confirmPassword } =
      formData;

    if (email !== confirmEmail) {
      alert("Emails do not match");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const data = await signup(email, password, username);

      setToken(data.token);

      localStorage.setItem("token", data.token);

      navigate("/home");
    } catch (err) {
      console.error(err);
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
