export default {
  loggedIn: (state, getters) => {
    if (state.token.length == 0){
      return false;
    }
    return true;
  }
};
