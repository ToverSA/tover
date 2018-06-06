export default {
  /* Check if we have a valid access token */
  loggedIn: (state, getters) => {
    return state.auth;
  }
};
