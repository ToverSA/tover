<template>
  <div class="about">
    <button @click="backButton">
      <span>back</span>
    </button>
    <h3>Types of buttons</h3>
    <div class="grid">
      <button>
        <span>Normal</span>
      </button>
      <button>
        <info-icon/>
        <span>icon</span>
      </button>
      <button disabled>
        <span>Disabled</span>
      </button>
      <button class="plain">
        <span>plain</span>
      </button>
    </div>
    <div class="grid theme">
      <button class="theme">
        <span>theme</span>
      </button>
      <button class="theme" disabled>
        <span>plain</span>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { infoIcon } from '@/icons';

@Component({
  components: { infoIcon },
})
export default class About extends Vue {
  public backButton() {
    this.$router.go(-1);
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
.grid {
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: white;
  align-items: flex-start;
  &.theme {
    background-color: $primary-color;
  }
}
</style>
