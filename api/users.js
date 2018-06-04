import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

var ClientOAuth2 = require('client-oauth2');

var oAuth = new ClientOAuth2({
  accessTokenUri: '/api/oauth/access_token',
  authorizationUri: '/api/oauth/authorize'
});

export default {
  createUser () {
    return 'create user';
  },
  authUser (username, password) {
    oAuth.owner.getToken(username, password).then(user  => {
      console.log(user);
    });
  }
};
