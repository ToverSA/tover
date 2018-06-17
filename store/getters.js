export default {
  /* Check if we have a valid access token */
  loggedIn: (state, getters) => {
    // TODO: Check if access token is valid, or available
    // return state.auth;
    return true;
  },
  campusSet (state) {
    return state.campusId != -1;
  }
};
