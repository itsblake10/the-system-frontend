/* -------------------------------------------------------------------------- */
/*                                 DATE RESETS                                */
/* -------------------------------------------------------------------------- */
import { DateTime } from "luxon";

/* -------------------------- GET NEXT DAILY RESET -------------------------- */
export const getNextDailyReset = (timeZone = "UTC") => {
  return DateTime.now()
    .setZone(timeZone)
    .startOf("day")
    .plus({ days: 1 })
    .toJSDate();
};

/* -------------------------- GET NEXT WEEKLY RESET ------------------------- */
export const getNextWeeklyReset = (timeZone = "UTC") => {
  return DateTime.now()
    .setZone(timeZone)
    .startOf("week")
    .plus({ weeks: 1 })
    .toJSDate();
};

/* --------------------------- ADVANCE RESET DATES -------------------------- */
export const advanceDailyReset = (date, timeZone = "UTC") => {
  return DateTime.fromJSDate(new Date(date), { zone: timeZone })
    .plus({ days: 1 })
    .toJSDate();
};

export const advanceWeeklyReset = (date, timeZone = "UTC") => {
  return DateTime.fromJSDate(new Date(date), { zone: timeZone })
    .plus({ weeks: 1 })
    .toJSDate();
};
