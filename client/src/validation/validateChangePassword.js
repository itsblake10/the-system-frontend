/* -------------------------------------------------------------------------- */
/*                       CHANGE PASSWORD FORM VALIDATION                      */
/* -------------------------------------------------------------------------- */
export function validateChangePassword(formData) {
  const errors = {};

  const currentPassword = formData.currentPassword?.trim() || "";
  const newPassword = formData.newPassword?.trim() || "";

  if (!currentPassword) {
    errors.currentPassword = "Current password is required.";
  }

  if (!newPassword) {
    errors.newPassword = "New password is required.";
  } else if (newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters.";
  } else if (newPassword === currentPassword) {
    errors.newPassword =
      "New password must be different from current password.";
  }

  return errors;
}
