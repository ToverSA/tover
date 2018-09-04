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
      <div v-show="menuOpened" class="user-menu" @click.stop>
        <div class="profile">
          <div class="close" @click="onClickGlobal">
            <close-icon/>
          </div>
          <img src="@/assets/clear.gif" alt="profile image">
          <h3>Sduduzo Gumede</h3>
          <p>gumedesduduzo@gmail.com</p>
          <button class="plain" @click="gotoProfile">
            <span>edit</span>
          </button>
        </div>
        <button class="plain" @click="logOut">
          <exit-icon/>
          <span>log out</span>
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
  editIcon,
  closeIcon,
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
    editIcon,
    closeIcon,
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
    this.$store.commit('header/closeMenu');
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
      background-color: $background-color;
      right: 5px;
      top: 5px;
      box-shadow: 0 1px 1px 1px rgba(128, 128, 128, 0.356);
      display: grid;

      > button {
        border-radius: 0;
        justify-content: flex-start;
      }

      .profile {
        min-width: 280px;
        background-color: white;

        .close {
          width: 50px;
          height: 50px;
          padding: 10px;
          right: 0;
          top: 0;
          position: absolute;
          svg {
            fill: $primary-color;
          }
        }

        img {
          background-color: $primary-color;
          width: 90px;
          height: 90px;
          border-radius: 45px;
          display: block;
          margin: 20px auto;
        }

        h3 {
          margin: 20px auto 5px;
          text-align: center;
        }
        p {
          margin: 5px auto;
          text-align: center;
          opacity: 0.5;
        }
        button {
          margin: 5px auto;
        }
      }
    }
    @media screen and (max-width: 450px) {
      margin: 0;

      a:not(.btn) {
        padding: 10px;
      }
      > button,
      > .btn {
        min-width: 0;
        padding: 0 5px;
        span {
          display: none;
        }
      }
      .user-menu {
        right: 3px;
        top: 3px;
      }
    }
  }
}
</style>
