<template>
    <div>
      <header>
        <app-logo/>
        <nav>
          <router-link v-bind:to="{name: 'dashboard'}" >
            <icons name="person_outline"/>
            <span>MY ACCOUNT</span>
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

@Component({ components: { AppFooter } })
export default class Home extends Vue {
  public created(): void {
    // console.log('hello');
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

  .app-logo {
    height: $bar-height;
    width: $bar-height;
  }

  nav {
    padding: 0;
    a {
      text-decoration: none;
      color: white;
      padding: 10px;
      display: flex;

      i,
      .icon {
        display: block;
        padding: 5px;
      }
      span {
        padding: 6px 5px;
        @media screen and (max-width: 450px) {
          display: none;
        }
      }
    }
  }
}
</style>
