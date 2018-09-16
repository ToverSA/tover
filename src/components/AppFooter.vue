<template>
  <div class="footer">
    <nav>
      <router-link :to="{name: 'about'}">About</router-link>
      <router-link :to="{name: 'about'}">FAQ</router-link>
    </nav>
    <nav>
      <router-link :to="{name: 'sell'}">Sell</router-link>
    </nav>
    <nav>
      <router-link :to="{name: 'dashboard'}">Admin</router-link>
    </nav>
    <span class="copyright">&copy; 2018 Tover</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class AppFooter extends Vue { }
</script>

<style lang="scss">
@import '@/app.scss';
div.footer {
  background-color: #546e7a;
  display: flex;
  flex-wrap: wrap;

  nav {
    flex-basis: 100px;
    padding: 5px 15px;
    display: grid;

    a {
      justify-self: flex-start;
      text-decoration: none;
      color: white;
      font-size: 0.8em;
      padding: 5px;
    }
  }
  span {
    display: block;
    background-color: #455a64;
    padding: 20px;
    text-align: center;
    color: white;
    font-size: 0.8em;
    float: 1;
    flex-basis: 100%;
  }
}
</style>

