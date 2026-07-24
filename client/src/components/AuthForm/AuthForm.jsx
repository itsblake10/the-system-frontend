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
  errors,
  variant = "",
  disabled,
}) => {
  return (
    <form
      className={`auth-form ${variant ? `auth-form--${variant}` : ""}`}
      name={formName}
      onSubmit={onSubmit}
    >
      <h1 className="auth-form__title">{title}</h1>
      <fieldset className="auth-form__fields">
        {fields.map((field) => (
          <label className="auth-form__label" key={field.key}>
            {field.label}
            <input
              className={`auth-form__input ${errors?.[field.key] || errors?.api ? "auth-form__input_error" : ""}`}
              name={field.key}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.key] ?? ""}
              onChange={onChange}
            />

            {errors?.[field.key] || errors?.api ? (
              <p className="auth-form__err-msg">
                {errors[field.key] || errors?.api}
              </p>
            ) : null}
          </label>
        ))}
      </fieldset>
      <button
        className="auth-form__submit-button"
        type="submit"
        disabled={disabled}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
