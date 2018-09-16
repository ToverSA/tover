<template>
    <div class="home" @click="onClickGlobal">
      <app-header/>
      <div class="quick-search" v-bind:class="{scrolled}">
        <div class="wrapper">
          <button class="plain" @click="gotoBrowse">
            <category-icon/>
            <span>Browse</span>
          </button>
          <input type="search" placeholder="e.g. Study guides, laptop chargers, muffins, etc." name="search">
          <button class="plain">
            <search-icon/>
            <span>Search</span>
          </button>
        </div>
      </div>
      <router-view/>
      <!-- <app-footer/> -->
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppHeader from '@/market/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import api from '@/api';
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
  private scrolled: boolean = false;
  private menuOpened: boolean = false;

  private created() {
    window.addEventListener('scroll', this.handleScroll);
    if (this.signedIn) {
      api.getProfile().then((response) => {
        this.$store.commit('profile', response.data);
      });
    }
  }

  private destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  private get signedIn(): boolean {
    return this.$store.getters.loggedIn;
  }

  private openMenu(): void {
    this.menuOpened = true;
  }

  private logOut(): void {
    this.$store.commit('signout');
  }

  private onClickGlobal() {
    this.$store.commit('header/closeMenu');
  }

  private handleScroll(event: Event) {
    this.scrolled = window.scrollY > 50;
  }

  private gotoBrowse(): void {
    this.$router.push({ name: 'browse' });
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
div.home {
  > header {
    margin-bottom: 68px;
  }

  overflow-x: hidden;
  .quick-search {
    z-index: 2;
    position: absolute;
    top: $bar-height;
    width: 100%;
    padding: 10px;
    background-color: $primary-color;

    &.scrolled {
      position: fixed;
      top: 0;
      box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.192);
    }

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
