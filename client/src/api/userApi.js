/* -------------------------------------------------------------------------- */
/*                                  USER API                                  */
/* -------------------------------------------------------------------------- */

const API_URL = "http://localhost:5000/api";

/* -------------------------------- GET USER -------------------------------- */
export async function getUser(token) {
  const res = await fetch(`${API_URL}/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to load user.");
  }

  return data;
}

/* ------------------------------ CHANGE EMAIL ------------------------------ */
export async function changeEmail(token, newEmail, password) {
  const res = await fetch(`${API_URL}/user/email`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      newEmail,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to change email.");
  }

  return data;
}

/* ----------------------------- CHANGE PASSWORD ---------------------------- */
export async function changePassword(token, currentPassword, newPassword) {
  const res = await fetch(`${API_URL}/user/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to change password.");
  }

  return data;
}

/* ----------------------------- DELETE ACCOUNT ----------------------------- */
export async function deleteAccount(token) {
  const res = await fetch(`${API_URL}/user`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete account.");
  }

  return data;
}

/* ------------------------------ RESET ACCOUNT ----------------------------- */
export async function resetAccount(token) {
  const res = await fetch(`${API_URL}/user/reset`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to reset account.");
  }

  return data;
}
