import "./SignIn.css";
import AuthForm from "../../components/AuthForm/AuthForm";
import theSystemLogo from "../../../public/the-system-logo.svg";

function SignIn() {
  const fields = [
    { name: "username/email", type: "text", placeholder: "Username/Email" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  return (
    <main className="signin">
      <img className="start__logo" src={theSystemLogo} alt="THE SYSTEM Logo" />
      <div className="signin-form__container">
        <AuthForm
          title="Sign In"
          fields={fields}
          formName="Sign In"
          buttonText="ENTER SYSTEM"
        />
      </div>
    </main>
  );
}

export default SignIn;
