/* --------------------------- QUEST/OBJECTIVE API -------------------------- */

const API_URL = "http://localhost:5000/api";

/* ---------------------------- GET DAILY QUESTS ---------------------------- */
export async function getAllDailyQuests() {
  const res = await fetch(`${API_URL}/questObjective/daily-quests`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to retrieve daily quests.");
  }

  return data;
}

/* --------------------------- GET MAIN OBJECTIVES -------------------------- */
export async function getAllMainObjectives() {
  const res = await fetch(`${API_URL}/questObjective/main-objectives`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to retrieve main objectives.");
  }

  return data;
}
