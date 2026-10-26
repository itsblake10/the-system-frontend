/* -------------------------------------------------------------------------- */
/*                               TIMEZONE HELPER                              */
/* -------------------------------------------------------------------------- */
export const getBrowserTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
};
