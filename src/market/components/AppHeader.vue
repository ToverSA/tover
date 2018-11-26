<template>
  <header>
    <div class="title">
      <router-link to="/">
        <logo-icon class="app-logo"/>
      </router-link>
      <h3>Market</h3>
    </div>
    <nav v-if="!signedIn">
      <router-link :to="{name: 'auth'}">
        <person-outline-icon/>
        <span>Sign in</span>
      </router-link>
    </nav>
    <nav v-else>
      <router-link :to="{name:'sell'}">
        <monetization-on-icon/>
        <span>Sell</span>
      </router-link>
      <router-link :to="{name:'profile'}">
        <person-icon/>
        <span>Profile</span>
      </router-link>
      <div @click="logOut">
        <exit-icon/>
        <span>Log out</span>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import api from '@/api';
import store from '@/store';

import {
  logoIcon,
  personIcon,
  menuIcon,
  personOutlineIcon,
  exitIcon,
  monetizationOnIcon,
} from '@/icons';


@Component({
  components: {
    logoIcon,
    personIcon,
    personOutlineIcon,
    menuIcon,
    exitIcon,
    monetizationOnIcon,
  },
})
export default class AppHeader extends Vue {

  private get signedIn(): boolean {
    return store.getters['auth/loggedIn'];
  }

  private gotoProfile(): void {
    this.$router.push({ name: 'profile' });
  }

  private logOut(): void {
    store.commit('auth/signout');
    const meta = this.$route.meta;
    if (!meta.hasOwnProperty('requiresAuth')) {
      return;
    }
    if (meta.requiresAuth) {
      this.$router.push({ name: 'home' });
    }
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
  .title {
    display: flex;

    h3 {
      margin: 0;
      padding: 15px;
      font-weight: 100;
      opacity: 0.3;
    }
  }

  .app-logo {
    height: $bar-height - 10px;
    width: $bar-height - 10px;
    margin: 5px;
  }

  nav {
    padding: 0;
    display: flex;
    position: relative;

    a,
    div {
      text-decoration: none;
      display: flex;
      padding: 15px;
      cursor: pointer;

      svg {
        height: 20px;
        width: 20px;
        display: block;
        fill: var(--primary-color);
      }
      span {
        display: block;
        margin: 2px;
        color: var(--primary-color);
        margin-left: 10px;
      }
      &:hover,
      &.router-link-active {
        background-color: var(--primary-color-hover);
      }
    }
  }
  @media screen and (max-width: 450px) {
    nav {
      a,
      div {
        span {
          display: none;
        }
      }
    }
  }
}
</style>
