<template>
  <div class="app-dialog">
    <div class="container">
      <!-- <h1>Title</h1>
      <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe odio vel deserunt ex consectetur obcaecati ab eius pariatur quam magni.</h3>
      <div class="buttons">
        <button>
          <span>publish</span>
        </button>
      </div> -->
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({

});
</script>

<style lang="scss" scoped>
div.app-dialog {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  top: 0;

  .container {
    padding: 50px;
    background-color: white;
    border-radius: 5px;
    max-width: 600px;
    margin: auto;
    margin-top: 60px;

    h1,
    h2,
    h3,
    p {
      padding: 0 5px;
      margin-top: 10px;
    }
    .buttons {
      display: flex;
      justify-content: flex-end;
    }
  }
  @media screen and (max-width: 450px) {
    .container {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 15px;
      border-radius: 0;
    }
  }
}
</style>
