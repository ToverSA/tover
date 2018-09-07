<template>
    <div class="home" @click="onClickGlobal">
      <app-header/>
      <div class="quick-search">
        <div class="wrapper">
          <button class="plain">
            <category-icon/>
            <span>Browse Category</span>
          </button>
          <input type="search" placeholder="e.g. Study guides, laptop chargers, muffins, etc." name="search">
          <button class="plain">
            <search-icon/>
            <span>Search</span>
          </button>
        </div>
      </div>
      
      <!-- <app-footer/> -->
      <router-view/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppHeader from '@/market/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { searchIcon, categoryIcon, schoolIcon } from '@/icons';
@Component({
  components: {
    AppHeader,
    AppFooter,
    searchIcon,
    categoryIcon,
    schoolIcon,
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
    this.$store.commit('header/closeMenu');
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
div.home {
  overflow-x: hidden;
  > header {
    position: fixed;
    z-index: 1;
  }
  .quick-search {
    padding: 10px;
    padding-top: $bar-height + 15px;
    background-color: $primary-color;
    .wrapper {
      background-color: $background-color;
      display: grid;
      grid-template-columns: max-content 1fr max-content;
      grid-gap: 2px;
      margin: auto;
      max-width: 768px;
      overflow: hidden;
      border-radius: 9px;

      input {
        font-size: 1em;
        padding: 10px;
        border: none;
        outline: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      button {
        min-width: 0;
        padding: 0;
        background-color: transparent;
        span {
          @media screen and (max-width: 450px) {
            display: none;
          }
        }
      }
    }
  }
}
</style>
