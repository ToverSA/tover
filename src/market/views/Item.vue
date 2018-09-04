<template>
    <div class="item">
      <div class="main-content">
        <div class="gallery">
          <img src="@/assets/clear.gif" alt="item image">
        </div>
        <div class="details"></div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppFooter from '@/components/AppFooter.vue';
import { searchIcon, helpIcon } from '@/icons';

@Component
export default class Item extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
div.item {
  .main-content {
    margin: 70px auto;
    max-width: 960px;
    display: grid;
    grid-template-columns: 300px 1fr;

    .gallery {
      background-color: white;

      img {
        background-color: rgba(0, 0, 0, 0.158);
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
