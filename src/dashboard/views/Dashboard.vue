<template>
  <div class="dashboard">
    <div class="sidebar">

    </div>
    <div class="loader">
      <app-loader/>
    </div>
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

  .loader {
    margin: auto;
    display: block;
    padding-top: 200px;
    display: flex;
    justify-content: center;
  }
}
</style>
