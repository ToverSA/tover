<template>
    <div class="home" @click="onClickGlobal">
      <app-header/>
      <div class="quick-search">
        <div class="wrapper">
          <button class="btn-plain">
            <category-icon/>
            <span>Browse Categories</span>
          </button>
          <input type="search" placeholder="e.g. Study guides, laptop chargers, muffins, etc.">
          <button class="btn-plain">
            <search-icon/>
            <span>Search</span>
          </button>
        </div>
      </div>
      <!-- <app-footer/> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppHeader from '@/market/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import {
  searchIcon,
  helpIcon,
  personOutlineIcon,
  localAtmIcon,
  categoryIcon,
} from '@/icons';
@Component({
  components: {
    AppHeader,
    AppFooter,
    searchIcon,
    helpIcon,
    personOutlineIcon,
    localAtmIcon,
    categoryIcon,
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
  header {
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
        svg {
          margin: 0;
        }
        span {
          padding: 1px 5px;
          @media screen and (max-width: 450px) {
            display: none;
          }
        }
      }
    }
  }
}
</style>
