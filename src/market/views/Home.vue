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
      <!-- <div class="section">
        <div class="header">
          <div class="info">
            <h3>consectetur adipisicing.</h3>
            <h4>Lorem ipsum dolor sit amet.</h4>
          </div>
          <button>
            <span>MORE</span>
          </button>
        </div>
        <div class="scrolling-wrapper">
          <div class="card" v-bind:key="i" v-for="i in [1, 2, 3, 4]">
            <div class="content">
              <img src="@/assets/clear.gif" alt="galaxy">
              <h3>R12 345</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <router-link :to="{ name: 'item', params: { id: i } }" class="card" v-bind:key="i" v-for="i in [1, 2, 3, 4]">
            <div class="content">
              <img src="@/assets/clear.gif" alt="galaxy">
              <h3>R12 345</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </router-link>
        </div>
      </div> -->
      <div class="section shimmer" v-show="1 === 1">
        <div class="header">
          <div class="info">
            <h3 class="shine"></h3>
            <h4 class="shine"></h4>
          </div>
          <button class="shine"></button>
        </div>
        <div class="scrolling-wrapper">
          <div class="card" v-bind:key="i" v-for="i in [1, 2, 3]">
            <div class="content">
              <img src="@/assets/clear.gif" alt="galaxy" class="shine">
              <h3 class="shine"></h3>
              <p class="shine"></p>
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
  .section {
    margin-bottom: 15px;

    .header {
      padding: 5px;
      display: grid;
      grid-template-columns: 1fr minmax(68px, min-content);
      max-width: 960px;
      width: 100vw;
      margin: auto;
      padding: 30px;
      padding-bottom: 0;
      min-height: 0; /* NEW */
      min-width: 0;

      .info {
        width: 100%;
        overflow: hidden;
        min-width: 0;

        h3,
        h4 {
          margin: 0;
          padding-left: 5px;
          color: #607d8b;
          width: 100%;
        }
        h4 {
          font-weight: normal;
          opacity: 0.5;
        }
      }
      button {
        align-self: flex-end;
      }
    }

    .scrolling-wrapper {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      max-width: 960px;
      margin: auto;
      padding: 5px 0;

      .card {
        padding: 15px;
        text-decoration: none;

        .content {
          background-color: white;
          display: grid;

          img {
            width: 100%;
            height: auto;
            display: block;
            background-color: rgba(0, 0, 0, 0.116);
          }
          h3,
          p {
            margin: 5px;
            color: black;
          }
          p {
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-height: 18px;
            height: 36px;
            overflow: hidden;
          }
        }
      }
    }
    @media screen and (max-width: 768px) {
      background-color: white;
      margin: 0;

      .header {
        padding: 10px 5px;
        padding-top: 25px;
      }

      .scrolling-wrapper {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        padding: 0;

        .card {
          flex: 0 0 auto;
          padding: 5px;

          .content {
            width: 130px;
            h3,
            p {
              margin: 5px 0;
            }
          }
        }
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    &.shimmer {
      .header {
        height: 75px;
        .info {
          height: 40px;
          h3 {
            height: 20px;
            margin-bottom: 2px;
            width: 90%;
          }
          h4 {
            height: 18px;
            opacity: 1;
            width: 60%;
          }
        }
        button,
        button:hover,
        button:active,
        button:focus {
          height: 40px;
          background-color: #f6f7f8;
        }
      }
      .scrolling-wrapper {
        .card {
          .content {
            img {
              background-color: #f6f7f8;
            }
            h3 {
              height: 22px;
              width: 80px;
              background-color: #f6f7f8;
            }
            p {
              background-color: #f6f7f8;
            }
          }
        }
      }
    }
  }
}
</style>
