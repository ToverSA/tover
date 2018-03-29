<template>
  <div id="app">
    <app-header></app-header>
    <h1>Hello {{ msg }}</h1>
  </div>
</template>
<script>
import AppHeader from './AppHeader.vue';
export default {
  components: { AppHeader },
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
