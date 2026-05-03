/* -------------------------------------------------------------------------- */
/*                              GAME SYSTEM (XP)                              */
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
/* ------------------------------------ . ----------------------------------- */
