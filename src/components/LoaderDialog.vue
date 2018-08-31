<template>
    <div class="popup-dialog">
      <div class="dialog loader">
        <div></div>
        <h3>{{title}}</h3>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class LoaderDialog extends Vue {
  @Prop({ type: String, required: true, default: 'Loading...' })
  public title!: string;
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

@keyframes loader-animation {
  from {
    background-color: $accent-color;
  }
  to {
    background-color: $primary-color-light;
  }
}

div.popup-dialog {
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 9;

  .dialog {
    max-width: 425px;
    width: 100%;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px;

    &.loader {
      display: flex;

      > div {
        height: 30px;
        width: 30px;
        border-radius: 15px;
        margin: 15px;
        animation-name: loader-animation;
        animation-duration: 1s;
        animation-iteration-count: infinite;
      }
    }
  }
}
</style>
