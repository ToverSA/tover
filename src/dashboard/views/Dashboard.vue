<template>
  <div class="dashboard">
    <div class="sidebar" v-bind:class="{opened: sidebarOpened}">
      <div class="strip">
        <div class="item menu-btn" @click="closeSidebar" >
          <menu-icon/>
        </div>
        <router-link :to="{name: 'home'}" class="item">
          <home-icon/>
        </router-link>
        <div class="item" @click="toggleAdd">
          <add-icon/>
        </div>
        <div class="item" @click="toggleSearch">
          <search-icon/>
        </div>
      </div>
      <div class="options" v-bind:class="{active: optionsActive === 1}" @click="closeAdd">
        <h2>Create</h2>
        <router-link :to="{name: 'createCampus'}">Campus</router-link>
        <router-link :to="{name: 'createInstitution'}">Institution</router-link>
      </div>
      <div class="options" v-bind:class="{active: optionsActive === 2}">
        <h2>Search</h2>
      </div>
    </div>
    <div id="testing" class="content-menu" @click="openSidebar" >
      <menu-icon/>
    </div>
    <router-view class="content"></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppLoader from '@/components/AppLoader.vue';
import AppTitle from '@/dashboard/components/AppTitle.vue';
import { menuIcon, homeIcon, addIcon, searchIcon } from '@/icons';

@Component({ components: { AppLoader, AppTitle, menuIcon, homeIcon, addIcon, searchIcon } })
export default class Dashboard extends Vue {
  private sidebarOpened: boolean = false;
  private optionsActive: boolean | number = false;

  private closeSidebar() { this.sidebarOpened = false; }
  private openAdd() { this.optionsActive = 1; }
  private closeAdd() {
    this.optionsActive = false;
    this.closeSidebar();
  }
  private openSearch() { this.optionsActive = 2; }
  private closeSearch() { this.optionsActive = false; }
  private toggleAdd() {
    if (this.optionsActive === 1) {
      this.closeAdd();
    } else {
      this.openAdd();
    }
  }
  private toggleSearch() {
    if (this.optionsActive === 2) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }
  private openSidebar() { this.sidebarOpened = true; }

  private signOut(): void {
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
      .item {
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        padding: 15px;
        background-color: rgba($primary-color-dark, 0.3);
        display: block;
        margin-bottom: 5px;

        &:hover {
          background-color: $primary-color-dark;
        }
        &.menu-btn {
          display: none;
        }
      }
    }
    .options {
      position: relative;
      display: none;
      width: 200px;

      &.active {
        display: block;
      }

      h2 {
        padding: 5px;
        color: $primary-color-light;
        opacity: 0.5;
      }
      span,
      a {
        display: block;
        margin: 10px 0;
        padding: 10px;
        margin-left: 15px;
        cursor: pointer;
        color: white;
        text-decoration: none;
        &:hover {
          background-color: rgba($primary-color-dark, 0.3);
        }
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
        .item {
          &.menu-btn {
            display: inline-block;
          }
        }
      }
    }
    .content-menu {
      display: inline-block;
      height: 50px;
      width: 50px;
      padding: 15px;
      margin: 5px 0 0 5px;
    }
    .title {
      padding-left: 55px;
      display: block;
    }
  }
}
</style>
