import "./SignIn.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import theSystemLogo from "../../../public/the-system-logo.svg";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const fields = [
    { name: "Username/Email:", type: "text", placeholder: "Username/Email..." },
    { name: "Password:", type: "password", placeholder: "Password..." },
  ];

  return (
    <main className="signin">
      <img className="start__logo" src={theSystemLogo} alt="THE SYSTEM Logo" />
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
          buttonText="ENTER SYSTEM"
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
