/* -------------------------------------------------------------------------- */
/*                            GAME SYSTEM (DAMAGE)                            */
/* -------------------------------------------------------------------------- */

/* --------------------------- DAMAGE APPLICATION --------------------------- */
export function applyDamage(playerStatus, damage) {
  let armor = playerStatus.armor;
  let health = playerStatus.health;

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
/* ------------------------------------ . ----------------------------------- */
