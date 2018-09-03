<template>
  <header @click="onClickGlobal">
    <router-link to="/">
      <app-logo inverted/>
    </router-link>
    <nav class="signed" v-if="signedIn">
      <router-link
         v-if="!isInProfile"
        class="btn btn-responsive"
        :to="{name: 'sell'}">
        <monetization-on-icon/>
        <span>Sell</span>
      </router-link>
      <button v-if="!isInProfile" @click.stop="openMenu" class="btn-responsive">
        <person-icon/>
        <span>Sduduzo Gumede</span>
      </button>
      <div v-show="menuOpened" class="user-menu">
        <button class="plain" @click="gotoProfile">
          <person-outline-icon/>
          <span>My Profile</span>
        </button>
        <button class="plain">
          <local-atm-icon/>
          <span>My Adverts</span>
        </button>
        <button class="plain" @click="logOut">
          <exit-icon/>
          <span>Log out</span>
        </button>
        <button class="plain">
          <help-icon/>
          <span>Help</span>
        </button>
      </div>
    </nav>
    <nav v-else>
      <router-link
        v-bind:to="{name: 'about'}">
        <span>About</span>
      </router-link>
      <router-link
        v-bind:to="{name: 'auth'}">
        <span>Sign in</span>
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import {
  searchIcon,
  helpIcon,
  personOutlineIcon,
  localAtmIcon,
  monetizationOnIcon,
  personIcon,
  infoIcon,
  exitIcon,
} from '@/icons';
@Component({
  components: {
    searchIcon,
    helpIcon,
    personOutlineIcon,
    localAtmIcon,
    monetizationOnIcon,
    personIcon,
    infoIcon,
    exitIcon,
  },
})
export default class AppHeader extends Vue {
  get menuOpened(): boolean {
    const header = this.$store.state.header;
    return header.menuOpened;
  }

  public get signedIn(): boolean {
    return this.$store.getters.loggedIn;
  }

  public get isInProfile(): boolean {
    return this.$route.name === 'profile';
  }

  public openMenu(): void {
    this.$store.commit('header/openMenu');
  }

  public gotoProfile(): void {
    this.$router.push({ name: 'profile' });
  }

  public logOut(): void {
    this.$store.commit('signout');
    const meta = this.$route.meta;
    if (!meta.hasOwnProperty('requiresAuth')) {
      return;
    }
    if (meta.requiresAuth) {
      this.$router.push({ name: 'home' });
    }
  }

  public onClickGlobal() {
    this.$store.commit('header/closeMenu');
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
header {
  height: $bar-height;
  background-color: $primary-color;
  display: flex;
  justify-content: space-between;
  width: 100%;

  .app-logo {
    height: $bar-height;
    width: $bar-height;
  }

  nav {
    padding: 0;
    display: flex;
    position: relative;

    .router-link-active {
      display: none;
    }
    a:not(.btn) {
      text-decoration: none;
      color: white;
      padding: 10px 30px;
      display: flex;
      font-weight: bold;

      span {
        padding: 6px 5px;
        &::first-letter {
          text-decoration: underline;
        }
      }
      &:hover {
        background-color: $primary-color-dark;
        span {
          &::first-letter {
            text-decoration: none;
          }
        }
      }
    }
    .user-menu {
      position: absolute;
      width: 200px;
      background-color: white;
      right: 5px;
      top: 45px;
      box-shadow: 0 1px 1px 1px rgba(128, 128, 128, 0.356);
      display: grid;

      button,
      .btn {
        min-width: auto;
        justify-content: flex-start;
      }
    }
    @media screen and (max-width: 450px) {
      margin: 0;
      a:not(.btn) {
        padding: 10px;
      }
      > button,
      .btn {
        min-width: auto;
        padding: 0 5px;
        span {
          display: none;
        }
      }
      .user-menu {
        right: 5px;
        top: 5px;
      }
    }
  }
}
</style>
