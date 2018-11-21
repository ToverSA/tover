<template>
  <div class="category">
    <div class="campus" v-for="insti in insties" v-bind:key="insti.institutionId">
      <img src="@/assets/clear.gif" alt="Campus image">
      <h3>{{insti.institutionName}}</h3>
      <ul>
        <li v-for="campus in insti.campuses" v-bind:key="campus.id">
          <router-link :to="{name: 'campus', params: {id: campus.id}}">{{campus.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Browse extends Vue {
  private insties: object = [];

}
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
    border-radius: 5px;
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
