/* -------------------------------------------------------------------------- */
/*                             GAME SYSTEM (CURRENCY)                         */
/* -------------------------------------------------------------------------- */

/* -------------------------- CURRENCY CALCULATION -------------------------- */
export function applyCurrency(currency, currencyRewards) {
  return {
    ...currency,

    coins: currency.coins + (currencyRewards?.coins || 0),
    manaCrystals: currency.manaCrystals + (currencyRewards?.manaCrystals || 0),
    raidKeys: currency.raidKeys + (currencyRewards?.raidKeys || 0),
  };
}
