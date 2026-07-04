/* ------------------------- SIGN UP FORM VALIDATION ------------------------ */
export function validateSignup(formData) {
  const errors = {};

  const username = formData.username.trim();
  const email = formData.email.trim();
  const confirmEmail = formData.confirmEmail.trim();
  const password = formData.password;
  const confirmPassword = formData.confirmPassword;

  //Username Length/Required + Username Format
  if (username.length < 4 || username.length > 15) {
    errors.username = "Username must be between 5-15 characters.";
  } else if (!/^[A-Za-z0-9_]+$/.test(username)) {
    errors.username = "Username ";
  }

  //Email Required + Email Format
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  //Email Match
  if (email !== confirmEmail) {
    errors.confirmEmail = "Emails must match.";
  }

  //Password length
  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  //Password Match
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match.";
  }

  return errors;
}
