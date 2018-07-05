<template lang="html">
  <div class="admin">
    <div class="sidebar">
      <h2>{{ section }}</h2>
      <router-link v-if="section !== 'Analytics'" :to="{ name: 'Analytics' }">
        <span>Back</span>
        <i class="material-icons md-20">keyboard_arrow_left</i>
      </router-link>
      <template v-if="section === 'Analytics'">
        <router-link :to="{ name: 'Campuses' }">
          <span>Campuses</span>
          <i class="material-icons md-20">school</i>
        </router-link>
        <router-link :to="{ name: 'Home' }">
          <span>Exit</span>
          <i class="material-icons md-20">exit_to_app</i>
        </router-link>
      </template>
      <template v-else-if="section === 'Campuses'">
        <!-- <div><span>Add Campus</span><i class="material-icons md-20">add</i></div> -->
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
  grid-template-columns: minmax(50px, auto) 1fr;

  .sidebar {
    background-color: $primary-color;
    height: 100vh;
    width: 320px;
    @media screen and (max-width: 450px) {
      width: auto;
    }

    h2 {
      color: #fff;
      margin: 0;
      padding: 30px;
      opacity: 0.5;
      @media screen and (max-width: 450px) {
        display: none;
      }
    }
    a,
    div {
      text-decoration: none;
      color: inherit;
      display: block;
      color: #fff;
      font-family: Lato Bold;
      display: flex;
      cursor: pointer;
      &:hover {
        background-color: rgba($primary-color-dark, 0.3);
      }
      i,
      span {
        display: inline-block;
        padding: 15px;
        margin: 0;
        &:first-child {
          flex-grow: 1;
          padding-left: 50px;
          @media screen and (max-width: 450px) {
            display: none;
          }
        }
        &:last-child {
          flex-basis: 50px;
        }
      }
    }
  }
  .main {
    height: 100vh;
    overflow: auto;
  }
}
</style>
