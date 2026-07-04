/* -------------------------------------------------------------------------- */
/*                                 DATE RESETS                                */
/* -------------------------------------------------------------------------- */

/* -------------------------- GET NEXT DAILY RESET -------------------------- */
export const getNextDailyReset = () => {
  const now = new Date();
  const reset = new Date(now);

  reset.setHours(0, 0, 0, 0);
  reset.setDate(reset.getDate() + 1);

  return reset;
};

/* -------------------------- GET NEXT WEEKLY RESET ------------------------- */
export const getNextWeeklyReset = () => {
  const now = new Date();
  const reset = new Date(now);

  reset.setHours(0, 0, 0, 0);
  const day = reset.getDay();
  const daysUntilMonday = (8 - day) % 7 || 7;

  reset.setDate(reset.getDate() + daysUntilMonday);

  return reset;
};
