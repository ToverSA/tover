<template>
  <div class="footer">
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
  span {
    display: block;
    background-color: #455a64;
    padding: 20px;
    text-align: center;
    color: white;
  }
}
</style>

