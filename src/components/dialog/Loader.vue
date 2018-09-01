<template>
  <app-dialog class="loader">
    <div class="app-loader">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="50" width="50" viewbox="0 0 50 50">
        <circle cx="25" cy="25" r="22" stroke-width="4"/>
      </svg>
    </div>
    <h3 class="status">Loading</h3>
  </app-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Dialog } from '@/components/dialog';
@Component({
  components: { appDialog: Dialog },
})
export default class Loader extends Vue {}
</script>


<style lang="scss" scoped>
@import '@/app.scss';
.app-loader {
  $easing: cubic-bezier(0.8, 0, 0.4, 0.8);
  $speed: 1320ms; // animation time for each loop
  $color: $primary-color; // Blue A200 in the Material Design color palette
  $linecap: square; // could be 'round', but the official one is square
  $loops: 5; // number of points where the arc meets
  $arc: 0.4; // fraction of the circumference that the arc grows to
  $perimeter: 45px * 3.14; // circumference of the raw svg inner cricle
  height: 50px;
  width: 50px;
  // measure to prevent inline block spacing from affecting the outer rotation
  font-size: 0;

  display: inline-block;
  animation: outer $speed * $loops linear infinite;

  svg {
    animation: inner $speed linear infinite;

    circle {
      fill: none;
      stroke: $color;
      stroke-linecap: $linecap;
      animation: arc $speed $easing infinite;
    }
  }

  @keyframes outer {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes inner {
    0% {
      transform: rotate(-360deg * (1 - $arc));
    }
    100% {
      transform: rotate(0);
    }
  }

  @keyframes arc {
    0% {
      stroke-dasharray: 1 $perimeter;
      stroke-dashoffset: 0;
    }
    40% {
      stroke-dasharray: $arc * $perimeter, $perimeter;
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: 1 $perimeter;
      stroke-dashoffset: -$arc * $perimeter;
    }
  }
}
</style>
