import "./SignUp.css";
import AuthForm from "../../components/AuthForm/AuthForm";

function SignUp() {
  const fields = [
    { name: "username", type: "text", placeholder: "Username" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "email", type: "email", placeholder: "confirm Email" },
    { name: "password", type: "password", placeholder: "Password" },
    { name: "email", type: "email", placeholder: "Confirm Password" },
  ];

  return (
    <AuthForm
      title="Sign Up"
      fields={fields}
      formName="Sign Up"
      buttonText="ENTER SYSTEM"
    />
  );
}

export default SignUp;
