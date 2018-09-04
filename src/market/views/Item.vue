<template>
    <div class="item">
      <div class="main-content">
        <img src="@/assets/clear.gif" alt="item image">
        <div class="options">
          <div class="opt" @click="$router.back()">
            <close-icon/>
          </div>
        </div>
        <div class="details">
          <p>Hello</p>
          <h2>R12 345</h2>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppFooter from '@/components/AppFooter.vue';
import { searchIcon, helpIcon, closeIcon } from '@/icons';

@Component({ components: { closeIcon } })
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
    grid-template-rows: 50px 200px 50px;
    background-color: white;

    img {
      background-color: rgba(0, 0, 0, 0.158);
      width: 100%;
      display: block;
      grid-column: 1 / 2;
      grid-row: 1 / 4;
    }
    .options {
      grid-column: 1 / 2;
      grid-row: 1 / 2;

      .opt {
        min-width: auto;
        padding: 5px;
        background-color: rgba(255, 255, 255, 0.103);
        height: 40px;
        width: 40px;
        margin: 5px;
        border-radius: 20px;
        svg {
          fill: $primary-color;
        }
      }
    }
    .details {
      background-color: red;
      grid-row: 1 / 4;
      p {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-height: 18px;
        height: 36px;
        overflow: hidden;
        margin: 7px;
      }
    }
  }
  @media screen and (max-width: 450px) {
    .main-content {
      margin: 0;
      grid-template-columns: 1fr;
      grid-template-rows: 50px 1fr 1fr;

      img {
        grid-column: 1 / 2;
        grid-row: 1 / 3;
        height: auto;
      }

      .options {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
      }

      .details {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
        align-self: flex-start;
      }
    }
  }
}
</style>
