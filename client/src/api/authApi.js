/* -------------------------------------------------------------------------- */
/*                             AUTHENTICATION API                             */
/* -------------------------------------------------------------------------- */

const API_URL = "https://localhost:5000/api";

/* --------------------------------- SIGN UP -------------------------------- */
export async function signup(email, password, player) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      player,
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

  return res.json();
}

/* ------------------------------- LOAD PLAYER ------------------------------ */
export async function getPlayer(token, player) {
  await fetch(`${API_URL}/player`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: json.stringify(player),
  });
}
