<template>
  <div class="post">
    <div class="image">
      <img :src="image">
      <div class="left scroll" @click="prevImage">
        <chevron-left-icon/>
      </div>
      <div class="right scroll" @click="nextImage">
        <chevron-right-icon/>
      </div>
      <div class="dots">
        <span
          :class="{active: images.indexOf(i) == imageIndex}"
          v-for="i in images"
          :key="i"></span>
      </div>
    </div>
    <div class="card">
      <h2>R {{price}}</h2>
      <p>{{title}}</p>
      <div class="buttons">
        <button>
          <span>contact</span>
        </button>
        <button class="borderless">
          <span>chat</span>
        </button>
        <button class="borderless">
          <span>more</span>
        </button>
      </div>
      <div class="posted-by">
        <span>posted by</span>
        <a href="#">Trevor Noah</a>
      </div>
    </div>
    <div class="description">
      <h2>Description</h2>
      <p>{{description}}</p>
    </div>
    <div class="closer" @click="onBack">
      <close-icon/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppFooter from '@/components/AppFooter.vue';
import AppHeader from '@/market/components/AppHeader.vue';
import { closeIcon, chevronRightIcon, chevronLeftIcon } from '@/icons';
import store from '@/store';
import { Advert } from '@/store/adverts';

const clear = require('@/assets/clear.gif');

@Component({ components: { closeIcon, chevronLeftIcon, chevronRightIcon } })
export default class Post extends Vue {

  private images: string[] = [];
  private imageIndex = 0;
  private price = '';
  private title = '';
  private description = '';

  private created() {
    if (this.$route.name === 'postPreview') {
      const advert: Advert = store.getters['adverts/post'];
      this.images = advert.images;
      this.price = advert.price!;
      this.title = advert.title!;
      this.description = advert.description!;
    }
  }

  private get image() {
    if (this.images.length !== 0) {
      return this.images[this.imageIndex];
    } else {
      return clear;
    }
  }

  private nextImage() {
    if (this.imageIndex < this.images.length - 1) {
      this.imageIndex++;
    } else {
      this.imageIndex = 0;
    }
  }
  private prevImage() {
    if (this.imageIndex === 0) {
      this.imageIndex = this.images.length - 1;
    } else {
      this.imageIndex--;
    }
  }

  public onBack(): void {
    if (window.history.state === null) {
      this.$router.push({ name: 'home' });
    } else {
      this.$router.go(-1);
    }
  }

}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
$max-width: 960px;
div.post {
  display: grid;
  margin: 50px auto;
  margin-bottom: 0;
  max-width: 870px;
  grid-template-columns: repeat(2, 400px);
  grid-template-rows: repeat(2, 175px);
  grid-gap: 50px 70px;
  position: relative;

  .closer {
    position: absolute;
    height: 40px;
    width: 40px;
    right: 0;
    top: 0;
    padding: 10px;
    opacity: 0.5;
    cursor: pointer;
    svg {
      fill: black;
    }
  }

  .image {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    background-color: white;
    box-shadow: 0 1px 2px 1px #ccc;
    position: relative;
    img {
      height: 100%;
      width: 100%;
    }
    .scroll {
      position: absolute;
      top: 50%;
      height: 40px;
      width: 40px;
      border-radius: 20px;
      padding: 5px;
      transform: translateY(-50%);
      &.left {
        left: 5px;
      }
      &.right {
        right: 5px;
      }
    }
    .dots {
      padding: 10px;
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      span {
        display: block;
        margin: 10px;
        height: 10px;
        width: 10px;
        border-radius: 5px;
        opacity: 0.5;
        background-color: white;
        &.active {
          opacity: 1;
          background-color: var(--primary-color);
        }
      }
    }
  }
  .card {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    background-color: white;
    box-shadow: 0 1px 2px 1px #ccc;
    padding: 10px 30px;

    h2,
    p {
      margin: 5px;
    }
    .buttons {
      display: flex;
      button {
        flex-grow: 1;
        &:last-child {
          visibility: hidden;
        }
      }
    }
    .posted-by {
      padding: 5px 0;
      span,
      a {
        display: inline-block;
        padding: 5px;
        text-decoration: none;
      }
    }
  }
  .description {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    background-color: white;
    box-shadow: 0 1px 2px 1px #ccc;
    padding: 5px;
  }
  @media screen and (max-width: 768px) {
    max-width: 570px;
    grid-template-columns: repeat(2, 270px);
    grid-template-rows: 150px 90px;
    grid-gap: 30px;

    .image {
      .dots {
        span {
          height: 6px;
          width: 6px;
        }
      }
    }
    .card {
      padding: 0;
      h2 {
        font-size: 1.7em;
        margin: 5px;
      }
      p {
        font-size: 0.9em;
      }
      .posted-by {
        padding: 0;
      }
    }

    .description {
    }
  }
  @media screen and (max-width: 450px) {
    display: block;
    max-width: 570px;
    grid-template-columns: repeat(2, 270px);
    grid-template-rows: repeat(2, 120px);
    grid-gap: 30px;
    margin: 0;

    .closer {
      right: auto;
      left: 5px;
      top: 5px;
      background-color: black;
      opacity: 0.2;
      border-radius: 20px;
      svg {
        fill: white;
      }
    }

    .image {
      height: 100vw;
      .scroll {
        opacity: 0.3;
        background-color: black;
      }
    }
    .card {
      margin-top: 5px;
      padding: 5px;
    }
    .description {
      margin-top: 10px;
      padding: 20px;
    }
  }
}
</style>
