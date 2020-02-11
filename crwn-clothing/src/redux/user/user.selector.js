import { createSelector } from "reselect";

const selectUser = state => state.user;

// can pass multiple selectors as separate parameters
export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);
