<template>
    <div>
      <header>
        <img src="@/assets/img/tover.png" alt="Tover logo">
        <nav>
          <router-link v-bind:to="{name: 'profile'}">
            <i class="material-icons">person_outline</i>
            <span>MY ACCOUNT</span>
          </router-link>
        </nav>
      </header>
      <app-footer/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppFooter from '@/components/AppFooter.vue';

@Component({ components: { AppFooter } })
export default class Home extends Vue {}
</script>


<style lang="scss" scoped>
@import '@/app.scss';
header {
  height: $bar-height;
  background-color: $primary-color;
  display: flex;
  justify-content: space-between;

  img {
    height: 100%;
  }

  nav {
    padding: 0;
    a {
      text-decoration: none;
      color: white;
      padding: 10px;
      display: flex;

      i {
        display: block;
        padding: 5px;
      }
      span {
        padding: 6px 5px;
      }
    }
  }
}
</style>
