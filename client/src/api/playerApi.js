/* -------------------------------------------------------------------------- */
/*                                 PLAYER API                                 */
/* -------------------------------------------------------------------------- */

const API_URL = "http://localhost:5000/api";

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

/* --------------------------- COMPLETE ONBOARDING -------------------------- */
export async function completeOnboarding(token, onboardingData) {
  const res = await fetch(`${API_URL}/player/onboarding/complete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(onboardingData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to complete onboarding");
  }

  return data;
}

/* ------------------------------- DAILY RESET ------------------------------ */
export async function dailyReset(token) {
  const res = await fetch(`${API_URL}/player/resets/daily`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to reset daily quests");
  }

  return data;
}

/* ------------------------------ WEEKLY RESETS ----------------------------- */
export async function weeklyReset(token) {
  const res = await fetch(`${API_URL}/player/resets/weekly`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to reset main objectives ");
  }

  return data;
}

/* ----------------------------- CHANGE USERNAME ---------------------------- */
export async function changeUsername(token, newUsername) {
  const res = await fetch(`${API_URL}/player/username`, {
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

/* ------------------------------ CHANGE TITLE ------------------------------ */
export async function changeTitle(token, title) {
  const res = await fetch(`${API_URL}/player/title`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
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

  const res = await fetch(`${API_URL}/player/avatar`, {
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

/* -------------------------- UPDATE GAME SETTINGS -------------------------- */
export async function updateGameSettings(token, settings) {
  const res = await fetch(`${API_URL}/player/settings`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(settings),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update game settings.");
  }

  return data;
}

/* ----------------------- UPDATE DAILY QUEST PROGRESS ---------------------- */
export async function updateDailyQuestProgress(token, taskId, amount) {
  const res = await fetch(`${API_URL}/player/daily-quests/${taskId}/progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      amount,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update daily quest progress.");
  }

  return data;
}

/* --------------------- UPDATE MAIN OBJECTIVE PROGRESS --------------------- */
export async function updateMainObjectiveProgress(token, taskId, amount) {
  const res = await fetch(
    `${API_URL}/player/main-objectives/${taskId}/progress`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount,
      }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to update main objective progress.",
    );
  }

  return data;
}

/* --------------------------- GET INVENTORY ITEMS -------------------------- */
export async function getInventoryItems(token) {
  const res = await fetch(`${API_URL}/player/inventory/items`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to load inventory items.");
  }

  return data;
}

/* --------------------------- USE INVENTORY ITEM --------------------------- */
export async function useInventoryItem(token, itemId) {
  const res = await fetch(`${API_URL}/player/inventory/use`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ itemId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to use inventory item.");
  }

  return data;
}

/* ---------------------------- TOGGLE EQUIPMENT ---------------------------- */
export async function toggleEquipment(token, itemId) {
  const res = await fetch(`${API_URL}/player/inventory/toggle-equipment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ itemId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to toggle equipment.");
  }

  return data;
}
