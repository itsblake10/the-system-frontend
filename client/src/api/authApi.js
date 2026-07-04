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

  return res.json();
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
