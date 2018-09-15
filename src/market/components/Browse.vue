<template>
  <div class="category">
    <div class="campus">
      <img src="@/assets/clear.gif" alt="Campus image">
      <h3>University of Zululand</h3>
      <ul>
        <li>
          <router-link :to="{name: 'campus', params: {id: 2}}">Richard's Bay Campus</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

})
</script>
<style lang="scss" scoped>
@import '@/app.scss';
div.category {
  background-color: $primary-color-dark;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;

  .campus {
    padding: 15px;
    padding-top: 50px;
    margin: 10px;
    margin-top: 50px;
    background-color: $primary-color;
    border-radius: 10px;
    position: relative;
    color: white;
    img {
      background-color: $primary-color-light;
      // background-color: white;
      height: 100px;
      width: 100px;
      border-radius: 50px;
      position: absolute;
      left: 50%;
      top: -50px;
      transform: translateX(-50%);
    }
    li {
      margin: 15px 0;

      a {
        text-decoration: none;
        color: white;
      }
    }
  }
}
</style>
