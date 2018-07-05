<template>
  <div class="account">
    <div class="sidebar" v-bind:class="{ opened: isSidebar }">
      <router-link :to="{ name: 'CreateAdvert' }" class="list-item">
        <i class="material-icons">add</i>
        <span>Create new</span>
      </router-link>
      <router-link :to="{ name: 'Adverts' }" class="list-item" v-bind:class="{ active: section == 'Adverts' }">
        <i class="material-icons">collections_bookmark</i>
        <span>Adverts</span>
      </router-link>
      <router-link :to="{ name: 'Profile' }" class="list-item" v-bind:class="{ active: section == 'Profile' }">
        <i class="material-icons">person_outline</i>
        <span>Profile</span>
      </router-link>
      <router-link :to="{ name: 'Chat' }" class="list-item">
        <i class="material-icons">chat_bubble_outline</i>
        <span>Chat</span>
      </router-link>
      <router-link :to="{ name: 'Home' }" class="list-item">
        <i class="material-icons">exit_to_app</i>
        <span>Exit</span>
      </router-link>
    </div>
    <div class="main">
      <div class="navbar">
        <span @click="isSidebar = true"><i class="material-icons">menu</i></span>
        <h2>{{ section }}</h2>
      </div>
      <router-view class="main-content"/>
    </div>
  </div>
</template>

<script>
import store from "../../../store";
export default {
  data() {
    return {
      isSidebar: false
    };
  },
  computed: {
    section() {
      return this.$route.name;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../app.scss";
div.account {
  display: flex;

  .sidebar {
    width: 320px;
    background-color: $primary-color;
    height: 100vh;
    @media screen and (max-width: 768px) {
      width: 240px;
    }
    @media screen and (max-width: 450px) {
      position: absolute;
      width: 100vw;
      transform: translateX(-100vw);
      &.opened {
        transform: translateX(0vw);
      }
    }

    .header {
      display: grid;
      grid-template-columns: 70px 1fr;
      padding: 20px 10px;
      padding-right: 0;
      background-color: $accent-color;

      img {
        width: 100%;
        display: block;
      }
      h3 {
        margin: 0;
        color: $primary-color-text;
        font-family: Lato Bold;
        padding: 20px;
        padding-right: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .list-item {
      text-decoration: none;
      margin: 10px 10px 0 50px;
      color: $primary-color-text;
      display: grid;
      grid-template-columns: 24px 1fr;
      padding: 10px;
      grid-gap: 10px;
      cursor: pointer;
      &.active {
        background-color: rgba($primary-color-dark, 0.5);
      }
      &:hover {
        background-color: $primary-color-dark;
      }

      span {
        padding: 2px;
      }
    }
  }
  .main {
    flex-grow: 1;
    height: 100vh;
    overflow: auto;

    .navbar {
      display: none;
      height: $bar-height;
      grid-template-columns: minmax(0, $bar-height) 1fr;
      background-color: $primary-color;
      color: $primary-color-text;
      @media screen and (max-width: 450px) {
        display: grid;
      }

      span {
        text-align: center;
        padding-top: 12px;
        cursor: pointer;
        color: $accent-color;
      }
      h2 {
        margin: 0;
        padding: 10px;
      }
    }
  }
}
</style>
