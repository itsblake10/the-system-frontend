/* -------------------------- GET NEXT DAILY RESET -------------------------- */
export const getNextDailyReset = () => {
  const now = new Date();
  const reset = new Date(now);

  reset.setHours(0, 0, 0, 0);
  reset.setDate(reset.getDate() + 1);

  return reset.toISOString();
};

/* -------------------------- GET NEXT WEEKLY RESET ------------------------- */
export const getNextWeeklyReset = () => {
  const now = new Date();
  const reset = new Date(now);

  reset.setHours(0, 0, 0, 0);
  const day = reset.getDay();
  const daysUntilMonday = (8 - day) % 7 || 7;

  reset.setDate(reset.getDate() + daysUntilMonday);

  return reset.toISOString();
};

/* ------------------------------ GET TIME LEFT ----------------------------- */
export const getTimeLeft = (resetISO) => {
  const now = new Date();
  const reset = new Date(resetISO);

  const diff = reset - now;

  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { hours, minutes, seconds };
};

/* ------------------------------ GET DAYS LEFT ----------------------------- */
export const getDaysLeft = (resetISO) => {
  const now = new Date();
  const reset = new Date(resetISO);

  const diff = reset - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
};

/* ------------------------------- FORMAT TIME ------------------------------ */
export const formatTime = ({ hours, minutes, seconds }) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};
