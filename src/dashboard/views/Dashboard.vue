<template>
  <div class="dashboard">
    <div class="sidebar">
      <!-- <button>
        <i class="material-icons">menu</i>
      </button> -->
      <router-link class="button" :to="{name: 'home'}">
        <icons name="home"/>
      </router-link>
      <button class="button">
        <icons name="exit"/>
      </button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppLoader from '@/components/AppLoader.vue';

@Component({ components: { AppLoader } })
export default class Dashboard extends Vue {}
</script>

<style lang="scss">
@import '@/app.scss';
div.dashboard {
  background-color: $primary-color;
  min-height: 100vh;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(0px, min-content) auto;

  .sidebar {
    min-height: 100vh;
    width: 55px;
    padding: 5px;

    button,
    .button {
      background-color: rgba($primary-color-dark, 0.3);
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
  }
}
</style>
