var mock = true;
export default {
  /* Check if we have a valid access token */
  loggedIn: (state) => {
    // TODO: Check if access token is valid, or available
    if (!mock) return state.auth;
    return true;
  },
  campusSet(state) {
    return state.campusId !== -1;
  }
};
