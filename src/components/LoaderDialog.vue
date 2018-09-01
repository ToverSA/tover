<template>
    <div class="dialog">
      <app-loader></app-loader>
      <h3>{{title}}</h3>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import AppLoader from '@/components/AppLoader.vue';

@Component({
  components: { AppLoader },
})
export default class LoaderDialog extends Vue {
  @Prop({ type: String, required: true, default: 'Loading...' })
  public title!: string;
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

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
    background-color: red;

    &.loader {
      display: flex;
    }
  }
}
</style>
