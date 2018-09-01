<template>
  <div class="overview">
    <div class="loader" v-if="loding">
      <app-loader/>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppLoader from '@/components/AppLoader.vue';

@Component({ components: { AppLoader } })
export default class Overview extends Vue {}
</script>


<style lang="scss" scoped>
@import '@/app.scss';
div.overview {
  background-color: $background-color;

  .loader {
    margin: auto;
    display: block;
    padding-top: 200px;
    display: flex;
    justify-content: center;
  }
}
</style>
