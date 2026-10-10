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
