<template lang="html">
  <div class="admin">
    <div class="sidebar">
      <h2>{{ section }}</h2>
      <router-link v-if="section !== 'Analytics'" :to="{ name: 'Analytics' }">Back</router-link>
      <template v-if="section === 'Analytics'">
        <router-link :to="{ name: 'Campuses' }">Campuses</router-link>
        <router-link :to="{ name: 'Home' }">Exit</router-link>
      </template>
      <template v-else-if="section === 'Campuses'">
        <span>Add Campus</span>
        <span>Add Institution</span>
      </template>
    </div>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    section() {
      return this.$route.name;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../app.scss";
div.admin {
  display: grid;
  grid-template-columns: 320px 1fr;

  .sidebar {
    background-color: $primary-color;
    height: 100vh;

    h2 {
      color: #fff;
      margin: 0;
      padding: 30px;
      opacity: 0.5;
    }
    a,
    span {
      text-decoration: none;
      color: inherit;
      padding: 15px 10px 15px 50px;
      display: block;
      color: #fff;
      font-family: Lato Bold;
      display: block;
      cursor: pointer;
      &:hover {
        background-color: rgba($primary-color-dark, 0.3);
      }
    }
  }
  .main {
    height: 100vh;
    overflow: auto;
  }
}
</style>
