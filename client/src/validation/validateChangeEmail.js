/* -------------------------------------------------------------------------- */
/*                        CHANGE EMAIL FORM VALIDATION                        */
/* -------------------------------------------------------------------------- */
export function validateChangeEmail(formData, currentEmail) {
  const errors = {};

  const newEmail = formData.newEmail?.trim() || "";
  const password = formData.password?.trim() || "";

  if (!newEmail) {
    errors.newEmail = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
    errors.newEmail = "Please enter a valid email address.";
  } else if (newEmail.toLowerCase() === currentEmail?.toLowerCase()) {
    errors.newEmail = "New email must be different from current email.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  return errors;
}
