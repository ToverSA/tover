<template>
  <header @click="onClickGlobal">
    <router-link to="/">
      <logo-icon class="app-logo"/>
    </router-link>
    <nav>
     
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import api from '@/api';

import {
  logoIcon,
} from '@/icons';


@Component({
  components: {
    logoIcon,
  },
})
export default class AppHeader extends Vue {

  private get menuOpened(): boolean {
    const header = this.$store.state.header;
    return header.menuOpened;
  }

  private get signedIn(): boolean {
    return this.$store.getters.loggedIn;
  }

  private get isInProfile(): boolean {
    return this.$route.name === 'profile';
  }

  private openMenu(): void {
    this.$store.commit('header/openMenu');
  }

  private gotoProfile(): void {
    this.$router.push({ name: 'profile' });
    this.$store.commit('header/closeMenu');
  }

  private logOut(): void {
    this.$store.commit('signout');
    const meta = this.$route.meta;
    if (!meta.hasOwnProperty('requiresAuth')) {
      return;
    }
    if (meta.requiresAuth) {
      this.$router.push({ name: 'home' });
    }
  }

  private onClickGlobal() {
    this.$store.commit('header/closeMenu');
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
header {
  height: $bar-height;
  background-color: white;
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-shadow: 0 1px 1px 1px #ccc;

  .app-logo {
    height: $bar-height - 10px;
    width: $bar-height - 10px;
    margin: 5px;
  }

  nav {
    padding: 0;
    display: flex;
    position: relative;
  }
  @media screen and (max-width: 450px) {
  }
}
</style>
