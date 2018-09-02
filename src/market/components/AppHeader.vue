<template>
  <header @click="onClickGlobal" v-bind:class="{inverted}">
    <router-link to="/"  v-if="inverted">
      <app-logo inverted/>
    </router-link>
    <a href="/" v-else>
      <app-logo inverted/>
    </a>
    <nav class="signed" v-if="signedIn">
      <router-link
        class="btn"
        :to="{name: 'sell'}">
        <monetization-on-icon/>
        <span>Sell</span>
      </router-link>
      <button  @click.stop="openMenu">
        <person-icon/>
        <span>Sduduzo Gumede</span>
      </button>
      <div v-show="menuOpened" class="user-menu">
        <button class="btn-plain">
          <person-outline-icon/>
          <span>My Profile</span>
        </button>
        <button class="btn-plain">
          <local-atm-icon/>
          <span>My Adverts</span>
        </button>
        <button class="btn-plain" @click="logOut">
          <icons name="exit"/>
          <span>Log out</span>
        </button>
        <button class="btn-plain">
          <help-icon/>
          <span>Help</span>
        </button>
      </div>
    </nav>
    <nav v-else>
      <router-link
        class="btn"
        v-bind:to="{name: 'about'}">
        <more-icon/>
        <span>About</span>
      </router-link>
      <router-link
        class="btn"
        v-bind:to="{name: 'auth'}">
        <person-outline-icon/>
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
  moreIcon,
} from '@/icons';
@Component({
  components: {
    searchIcon,
    helpIcon,
    personOutlineIcon,
    localAtmIcon,
    monetizationOnIcon,
    personIcon,
    moreIcon,
  },
  props: {
    inverted: Boolean,
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

  public openMenu(): void {
    this.$store.commit('header/openMenu');
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
    margin-right: 50px;
    display: flex;
    position: relative;
    a,
    button {
      text-decoration: none;
      color: white;
      padding: 10px;
      display: flex;

      .icon {
        display: block;
        padding: 5px;
      }
      span {
        padding: 6px 5px;
      }
    }
    .user-menu {
      position: absolute;
      width: 200px;
      background-color: white;
      right: 0;
      top: 90%;

      button {
        width: 100%;
      }
    }
    @media screen and (max-width: 450px) {
      margin: 0;

      > a,
      > button {
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
  &.inverted {
    background-color: white;
    a,
    button {
      background-color: white;
    }
    svg,
    span {
      fill: $primary-color;
      color: $primary-color;
    }
  }
}
</style>
