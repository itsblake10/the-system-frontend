export function applyStats(playerStats, statRewards) {
  let updated = { ...playerStats };

  statRewards.forEach(({ type, amount }) => {
    updated[type] = (updated[type] || 0) + amount;
  });

  return updated;
}
