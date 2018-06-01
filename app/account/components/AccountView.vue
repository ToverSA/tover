<template>
  <router-view></router-view>
</template>

<script>
import AccountHeader from './AccountHeader'
import store from '../../../store'
export default {
  components: { AccountHeader },
  beforeRouteEnter: function (to, from, next) {
    let token = store.state.token;
    if (token.length == 0){
      console.log('no token');
    }
    next();
  }
}
</script>
