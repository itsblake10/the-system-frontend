import "./SignUp.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import theSystemLogo from "../../../public/the-system-logo.svg";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const fields = [
    { name: "Username:", type: "text", placeholder: "Username..." },
    { name: "Email:", type: "email", placeholder: "Email..." },
    { name: "Confirm Email:", type: "email", placeholder: "confirm Email..." },
    { name: "Password:", type: "password", placeholder: "Password..." },
    {
      name: "Confirm Password:",
      type: "password",
      placeholder: "Confirm Password...",
    },
  ];

  return (
    <main className="signup">
      <img className="start__logo" src={theSystemLogo} alt="THE SYSTEM Logo" />
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
          buttonText="ENTER SYSTEM"
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
