import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

var ClientOAuth2 = require('client-oauth2');
var resource = Vue.resource('/api/users{/id}');

var oAuth = new ClientOAuth2({
  clientId: 'webclient',
  accessTokenUri: '/api/oauth/access_token'
});

export default {
  createUser (username, password) {
    resource.save({}, {username, password}).then(res => {
      console.log(res);
    });
  },
  authUser (username, password) {
    return oAuth.owner.getToken(username, password);
  }
};
