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
      <div class="section" v-bind:key="i" v-for="i in [1, 2]">
        <div class="wrapper">
          <div class="heading">
            <h2>Section {{i}}</h2>
            <button class="btn-rounded btn-accent-alpha">
              <span>MORE</span>
            </button>
          </div>
          <div class="card-wrapper">
            <div v-bind:key="j" v-for="j in [1, 2, 3, 4, 5, 6, 7, 8]" class="card">
              <div class="inner">
                <div class="outer"></div>
              </div>
            </div>
          </div>
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
import { searchIcon, categoryIcon } from '@/icons';
@Component({
  components: {
    AppHeader,
    AppFooter,
    searchIcon,
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
  .section {
    padding: 10px;

    .wrapper {
      background-color: white;
      max-width: 1024px;
      margin: auto;
      padding: 1px;

      .heading {
        padding: 10px;
        max-width: 1024px;
        display: grid;
        grid-template-columns: 1fr max-content;
        padding-right: 5px;
        h2 {
          margin: 0;
          padding: 5px;
          color: rgb(112, 112, 112);
          font-weight: normal;
        }
      }
      .card-wrapper {
        padding: 5px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 20px;
        .card {
          background-color: rgb(236, 233, 233);
          padding: 5px;
          .outer {
            position: relative;
            &:before {
              display: block;
              content: '';
              width: 100%;
              padding-top: (3 / 2) * 100%;
            }
            > .inner {
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
            }
          }
        }
      }
    }
    @media screen and (max-width: 768px) {
      padding: 0;
      .wrapper {
        .card-wrapper {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          padding: 0;
          -webkit-overflow-scrolling: touch;
          .card {
            flex: 0 0 auto;
            min-width: 130px;
            height: auto;
            margin: 5px;
          }
        }
      }
    }
  }
}
</style>
