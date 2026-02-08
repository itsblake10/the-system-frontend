import "./AuthForm.css";

const AuthForm = ({ title, formName, fields, onSubmit, buttonText }) => {
  return (
    <form className="auth-form" name={formName}>
      <h1 className="auth-form__title">{title}</h1>
      <fieldset className="auth-form__fields">
        {fields.map((field) => (
          <label className="auth-form__label">
            {field.name}
            <input className="auth-form__input" key={field.name} {...field} />
          </label>
        ))}
      </fieldset>
      <button className="auth-form__submit-button">{buttonText}</button>
    </form>
  );
};

export default AuthForm;
