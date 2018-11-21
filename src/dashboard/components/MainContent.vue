<template>
  <div class="content">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({

});
</script>
<style lang="scss" scoped>
div.content {
  overflow: auto;
  max-height: 100vh;
  padding: 50px 100px;

  .content-card {
    background-color: white;
    box-shadow: 0 1px 1px 1px #ccc;
    border-radius: 2px;
  }
  @media screen and (max-width: 768px) {
    padding: 20px;
  }

  @media screen and (max-width: 450px) {
    max-height: calc(100vh - 50px);
    padding: 10px 5px;
  }
}
</style>
