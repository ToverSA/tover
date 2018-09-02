<template>
    <div class="home" @click="onClickGlobal">
      <header>
        <app-logo/>
        <nav class="signed" v-if="signedIn">
          <router-link
            class="btn"
            v-bind:to="{name: 'search'}">
            <search-icon/>
          </router-link>
          <button>
            <icons name="monetization_on"/>
            <span>Sell</span>
          </button>
          <button  @click.stop="openMenu">
            <icons name="person"/>
            <span>Sduduzo Gumede</span>
          </button>
          <div v-show="menuOpened" class="user-menu">
            <button class="btn-plain">
              <person-outline-icon/>
              <span>My Profile</span>
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
            v-bind:to="{name: 'search'}">
            <search-icon/>
          </router-link>
          <router-link
            class="btn"
            v-bind:to="{name: 'auth'}">
            <person-outline-icon/>
            <span>SIGN IN</span>
          </router-link>
        </nav>
        
      </header>
      <app-footer/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppFooter from '@/components/AppFooter.vue';
import { searchIcon, helpIcon, personOutlineIcon } from '@/icons';
@Component({
  components: {
    AppFooter,
    searchIcon,
    helpIcon,
    personOutlineIcon,
  },
})
export default class Home extends Vue {
  public menuOpened: boolean = false;

  public get signedIn(): boolean {
    return this.$store.getters.loggedIn;
  }

  public openMenu(): void {
    this.menuOpened = true;
  }

  public logOut(): void {
    this.$store.commit('signout');
  }

  public onClickGlobal() {
    this.menuOpened = false;
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
div.home {
  header {
    height: $bar-height;
    background-color: $primary-color;
    display: flex;
    justify-content: space-between;

    .app-logo {
      height: $bar-height;
      width: $bar-height;
    }

    nav {
      padding: 0;
      display: flex;
      position: relative;
      a,
      button {
        text-decoration: none;
        color: white;
        padding: 10px;
        display: flex;
        // background-color: transparent;

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
        right: 20px;
        top: 90%;

        button {
          width: 100%;
        }
      }
      @media screen and (max-width: 450px) {
        > a,
        > button {
          span {
            display: none;
          }
        }
      }
    }
  }
}
</style>
