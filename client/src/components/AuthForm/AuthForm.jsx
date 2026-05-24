/* -------------------------------------------------------------------------- */
/*                             AUTH FORM COMPONENT                            */
/* -------------------------------------------------------------------------- */

import "./AuthForm.css";

const AuthForm = ({
  title,
  formName,
  formData,
  fields,
  onSubmit,
  onChange,
  buttonText,
}) => {
  return (
    <form className="auth-form" name={formName} onSubmit={onSubmit}>
      <h1 className="auth-form__title">{title}</h1>
      <fieldset className="auth-form__fields">
        {fields.map((field) => (
          <label className="auth-form__label" key={field.key}>
            {field.label}
            <input
              className="auth-form__input"
              name={field.key}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.key] ?? ""}
              onChange={onChange}
            />
          </label>
        ))}
      </fieldset>
      <button className="auth-form__submit-button" type="submit">
        {buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
