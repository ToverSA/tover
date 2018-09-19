<template>
  <div class="create-campus">
    <app-title/>
    <div class="form">
      <input type="text" placeholder="Institution name">
      <select>
        <option>- Select institution -</option>
      </select>
      <button>
        <span>next</span>
      </button>
      <router-link :to="{name: 'dashboard'}" class="btn theme">
        <span>cancel</span>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppLoader from '@/components/AppLoader.vue';
import AppTitle from '@/dashboard/components/AppTitle.vue';

@Component({ components: { AppLoader, AppTitle } })
export default class CreateCampus extends Vue {
  public loading: boolean = false;
}
</script>


<style lang="scss" scoped>
@import '@/app.scss';
div.create-campus {
  background-color: white;

  .form {
    margin: 100px auto 5px;
    max-width: 400px;
    padding: 20px 50px;

    input {
      margin: 10px 0;
      border: 0;
      width: 100%;
      padding: 10px;
      font-size: 1em;
      border-bottom: 2px solid $primary-color-light;
      outline: none;
      &:focus {
        border-bottom-color: $primary-color;
      }
    }
    select,
    option {
      width: 100%;
      padding: 10px;
      outline: none;
      font-size: 1em;
      border: none;
      background-color: white;
      border-bottom: 2px solid $primary-color-light;
      &:focus {
        border-bottom-color: $primary-color;
      }
    }
    button,
    .btn {
      display: inline-block;
    }
  }
  @media screen and (max-width: 450px) {
    .form {
      padding: 20px;
    }
  }
}
</style>
