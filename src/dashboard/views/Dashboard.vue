<template>
  <div class="dashboard">
    <div class="sidebar" v-bind:class="{opened: sidebarOpened}">
      <div class="strip">
        <button @click="closeSidebar" class="menu-btn">
          <icons name="menu"/>
        </button>
        <router-link :to="{name: 'home'}" class="button btn-c">
          <icons name="home"/>
        </router-link>
        <button @click="signOut" class="btn-c">
          <icons name="exit"/>
        </button>
      </div>
      <div class="options">
        <app-title></app-title>
        <button>
          <span>Overview</span>
        </button>
        <button>
          <span>Overview</span>
        </button>
      </div>
    </div>
    <button @click="openSidebar" class="content-menu">
      <icons name="menu"/>
    </button>
    <router-view class="content"></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppLoader from '@/components/AppLoader.vue';
import AppTitle from '@/dashboard/components/AppTitle.vue';

@Component({ components: { AppLoader, AppTitle } })
export default class Dashboard extends Vue {
  public sidebarOpened: boolean = true;

  public closeSidebar(): void {
    this.sidebarOpened = false;
  }
  public openSidebar(): void {
    this.sidebarOpened = true;
  }
  public signOut(): void {
    this.$store.commit('signout');
    this.closeSidebar();
    this.$router.push({ name: 'home' });
  }
}
</script>

<style lang="scss">
@import '@/app.scss';
div.dashboard {
  background-color: $primary-color;
  min-height: 100vh;
  height: 100%;
  display: grid;
  grid-template-columns: min-content 1fr;

  .sidebar {
    min-height: 100vh;
    padding: 5px;
    z-index: 3;
    background-color: $primary-color;
    display: grid;
    grid-template-columns: 50px 1fr;

    .strip {
      button,
      .button {
        text-decoration: none;
        color: white;
        height: 45px;
        width: 45px;
        display: block;
        padding: 13px;
        border-radius: 23px;
        margin-bottom: 10px;
        border: none;
        outline: none;
        &:active {
          background-color: $primary-color-dark;
        }
        cursor: pointer;
      }

      .menu-btn {
        display: none;
      }
    }
    .options {
      .title {
        padding: 0;
        color: $primary-color-light;
        margin: 15px 0;
        width: 250px;
        display: block;
        margin-bottom: 40px;
      }

      button {
        width: 100%;
        text-align: start;
        color: white;
        background-color: rgba(0, 0, 0, 0.068);
      }
    }
  }

  .content-menu {
    display: none;
    position: absolute;
    height: 55px;
    width: 55px;
    border: none;
    background-color: transparent;
    z-index: 2;

    svg {
      fill: black;
    }
  }
  .content {
    width: 100%;
  }
  .title {
    padding: 0 10px;
    display: none;
  }

  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;

    .sidebar {
      position: absolute;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      transform: translateX(-100%);

      &.opened {
        transform: translateX(0);
      }
      transition: ease-in-out 200ms;

      .strip {
        .menu-btn {
          display: inline-block;
        }
      }
    }
    .content-menu {
      display: inline-block;
    }
    .title {
      padding-left: 55px;
      display: block;
    }
  }
}
</style>
