/* -------------------------------------------------------------------------- */
/*                               PLAYER REDUCER                               */
/* -------------------------------------------------------------------------- */

export function playerReducer(state, action) {
  switch (action.type) {
    /* ------------------------------- LOAD PLAYER ------------------------------ */

    case "LOAD_PLAYER":
      return action.payload;

    default:
      return state;
  }
}
