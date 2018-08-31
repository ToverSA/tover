<template>
  <div class="footer">
    <span>&copy; 2018 Tover, Inc. All rights reserved</span>
    <nav>
      <router-link :to="{name: 'dashboard'}">INTERNAL</router-link>
      <span>|</span>
      <router-link :to="{name: 'about'}">ABOUT</router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class AppFooter extends Vue {}
</script>

<style lang="scss">
@import '@/app.scss';
div.footer {
  background-color: #37474f;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap-reverse;

  nav {
    display: flex;
    flex-wrap: wrap;

    a {
      color: $primary-color;
      text-decoration: none;
    }
  }
  span,
  a {
    margin: 5px;
  }
}
</style>

