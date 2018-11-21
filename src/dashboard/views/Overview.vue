<template>
  <div class="overview">
    <dashboard>
      <sidebar title="Overview">
        <router-link :to="{name: 'home'}">Home</router-link>
        <router-link :to="{name: 'institutions'}">Institutions</router-link>
      </sidebar>
    </dashboard>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Dashboard from '@/dashboard/components/Dashboard.vue';
import Sidebar from '@/dashboard/components/Sidebar.vue';

@Component({ components: { Dashboard, Sidebar } })
export default class Overview extends Vue {

}
</script>

<style lang="scss">
@import '@/app.scss';
div.overview {
  background-color: var(--background-color);
  min-height: 100vh;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;

  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}
</style>
