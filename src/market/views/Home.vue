<template>
    <div class="home" @click="onClickGlobal">
      <app-header/>
      <div class="quick-search" v-bind:class="{scrolled}">
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
      <router-view/>
      <router-view/>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
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
  public scrolled: boolean = false;
  public menuOpened: boolean = false;

  public created() {
    window.addEventListener('scroll', this.handleScroll);
  }
  public destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }

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

  private handleScroll(event: Event) {
    this.scrolled = window.scrollY > 50;
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
div.home {
  > header {
    margin-bottom: 65px;
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
