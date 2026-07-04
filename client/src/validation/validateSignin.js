/* ------------------------- SIGN IN FORM VALIDATION ------------------------ */
export function validateSignin(formData) {
  const errors = {};

  const email = formData.email?.trim() || "";
  const password = formData.password?.trim() || "";

  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  return errors;
}
