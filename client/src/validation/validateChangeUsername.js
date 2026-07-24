/* --------------------- CHANGE USERNAME FORM VALIDATION -------------------- */
export function validateChangeUsername(formData, currentUsername) {
  const errors = {};

  const newUsername = formData.newUsername?.trim() || "";

  if (!newUsername) {
    errors.newUsername = "Username is required.";
  } else if (newUsername.length < 4) {
    errors.newUsername = "Username must be at least 4 characters.";
  } else if (newUsername.length > 15) {
    errors.newUsername = "Username cannot exceed 15 characters.";
  } else if (!/^[A-Za-z0-9_]+$/.test(newUsername)) {
    errors.newUsername =
      "Username can only contain letters, numbers, and underscores.";
  } else if (newUsername.toLowerCase() === currentUsername?.toLowerCase()) {
    errors.newUsername =
      "New username must be different from current username.";
  }

  return errors;
}
