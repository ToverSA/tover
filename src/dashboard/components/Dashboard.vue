<template>
  <div class="dashboard">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Dashboard extends Vue {

}
</script>

<style lang="scss">
@import '@/app.scss';
div.dashboard {
  background-color: var(--background-color);
  min-height: 100vh;
  height: 100%;
  display: grid;
  grid-template-columns: 280px 1fr;

  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}
</style>
