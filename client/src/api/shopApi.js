/* -------------------------------------------------------------------------- */
/*                                  SHOP API                                  */
/* -------------------------------------------------------------------------- */

const API_URL = "http://localhost:5000/api";

/* ----------------------------- GET SHOP ITEMS ----------------------------- */
export async function getShopItems() {
  const res = await fetch(`${API_URL}/shop/items`, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to load shop items.");
  }

  return data;
}

/* ------------------------------ BUY SHOP ITEM ----------------------------- */
export async function buyShopItem(token, itemId) {
  const res = await fetch(`${API_URL}/shop/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ itemId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to buy item.");
  }

  return data;
}

/* ------------------------------ SELL SHOP ITEM ----------------------------- */
export async function sellShopItem(token, itemId) {
  const res = await fetch(`${API_URL}/shop/sell`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ itemId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to sell item.");
  }

  return data;
}
