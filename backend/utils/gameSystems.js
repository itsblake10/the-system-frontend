/* -------------------------------------------------------------------------- */
/*                                GAME SYSTEMS                                */
/* -------------------------------------------------------------------------- */

/* ----------------------------- XP APPLICATION ----------------------------- */
export function applyXp(playerLevel, amount) {
  let xp = playerLevel.xp + amount;
  let level = playerLevel.level;
  let xpToNext = playerLevel.xpToNextLevel;

  while (xp >= xpToNext) {
    xp -= xpToNext;
    level += 1;
    xpToNext += 500;
  }

  return { xp, level, xpToNextLevel: xpToNext };
}

/* ------------------------- STAT POINT APPLICATION ------------------------- */
export function applyStats(playerStats, statRewards = []) {
  let updated = { ...playerStats };

  statRewards.forEach(({ type, amount }) => {
    updated[type] = (updated[type] || 0) + amount;
  });

  return updated;
}

/* -------------------------- CURRENCY CALCULATION -------------------------- */
export function applyCurrency(currency, currencyRewards) {
  return {
    ...currency,

    coins: (currency.coins || 0) + (currencyRewards?.coins || 0),
    manaCrystals:
      (currency.manaCrystals || 0) + (currencyRewards?.manaCrystals || 0),
    raidKeys: (currency.raidKeys || 0) + (currencyRewards?.raidKeys || 0),
  };
}

/* --------------------------- DAMAGE APPLICATION --------------------------- */
export function applyDamage(playerStatus, damage = 0) {
  let armor = playerStatus.armor || 0;
  let health = playerStatus.health || 0;

  damage = Math.max(0, Number(damage) || 0);

  armor -= damage;

  if (armor < 0) {
    health += armor;
    armor = 0;
  }

  return {
    ...playerStatus,
    armor,
    health: Math.max(health, 0),
  };
}
