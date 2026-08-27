/* -------------------------------------------------------------------------- */
/*                             AUTHENTICATION API                             */
/* -------------------------------------------------------------------------- */

const API_URL = "http://localhost:5000/api";

/* --------------------------------- SIGN UP -------------------------------- */
export async function signup(email, password, username) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      username,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Signup failed.");
  }

  return data;
}

/* ---------------------------------- LOGIN --------------------------------- */
export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed.");
  }

  return data;
}

/* ------------------------------- LOAD PLAYER ------------------------------ */
export async function getPlayer(token) {
  const res = await fetch(`${API_URL}/player`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

/* ------------------------------- SAVE PLAYER ------------------------------ */
export async function savePlayer(token, player) {
  const res = await fetch(`${API_URL}/player`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(player),
  });

  return res.json();
}

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

/* ----------------------------- CHANGE USERNAME ---------------------------- */
export async function changeUsername(token, newUsername) {
  const res = await fetch(`${API_URL}/user/username`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      newUsername,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to change username.");
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

/* ------------------------------ CHANGE TITLE ------------------------------ */
export async function changeTitle(token, selectedTitle) {
  const res = await fetch(`${API_URL}/user/title`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: selectedTitle,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to change title.");
  }

  return data;
}

/* ------------------------------ CHANGE AVATAR ----------------------------- */
export async function changeAvatar(token, file) {
  const formData = new FormData();

  formData.append("avatar", file);

  const res = await fetch(`${API_URL}/user/avatar`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to change avatar.");
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
