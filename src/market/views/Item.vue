<template>
    <div class="item">
      <div class="main-content">
        <img src="@/assets/clear.gif" alt="item image">
        <div class="slider">
          <div class="scroll left">
            <chevron-left-icon/>
          </div>
          <div class="scroll right">
            <chevron-right-icon/>
          </div>
          <div class="dots">
            <span class="active"></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="options">
          <div class="opt" @click="$router.back()">
            <close-icon/>
          </div>
        </div>
        <div class="details">
          <h2>R12 345</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, aperiam aliquid? Assumenda illum, aperiam voluptatem molestiae tempore amet. Deleniti accusantium labore eius corporis voluptas ex illum ullam mollitia ipsum est exercitationem quidem, consequatur officiis officia vitae provident ratione odit eum repellendus blanditiis aliquid saepe. Soluta voluptas quo illum animi veritatis!</p>
          <div class="price"></div>
          <div class="controls">
            <button>
              <span>contact</span>
            </button>
            <button class="theme">
              <span>chat</span>
            </button>
          </div>
        </div>
      </div>
      <div class="second">
        <div class="description">
          <h2>Description</h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae facilis nesciunt illum nisi ea voluptatum officiis corrupti harum, perspiciatis cum, dicta similique, assumenda dolores. Consequatur nobis labore, maiores atque maxime quos. Excepturi similique, quidem cupiditate laboriosam enim blanditiis quaerat sed voluptate culpa cumque, quas ex rem quam omnis officia soluta?</p>
        </div>
        <div class="owner">
          <h2>Posted by</h2>
          <img src="@/assets/clear.gif" alt="owner profile">
          <div class="info">
            <h3>Cheese cake inc</h3>
            <span>3 posts</span>
          </div>
          <div class="controls">
            <button class="theme">
              <span>follow</span>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppFooter from '@/components/AppFooter.vue';
import { closeIcon, chevronRightIcon, chevronLeftIcon } from '@/icons';

@Component({ components: { closeIcon, chevronLeftIcon, chevronRightIcon } })
export default class Item extends Vue { }
</script>

<style lang="scss" scoped>
@import '@/app.scss';
$max-width: 960px;
div.item {
  .main-content {
    margin: 70px auto;
    margin-bottom: 15px;
    max-width: $max-width;
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
    .slider {
      grid-column: 1 / 2;
      grid-row: 1 / 4;

      .scroll,
      .dots {
        display: none;
      }
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
      padding: 50px;
      grid-row: 1 / 4;

      p {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-height: 18px;
        height: 54px;
        overflow: hidden;
        margin: 20px 5px;
      }
      .controls {
        display: flex;
      }
    }
  }

  .second {
    margin: auto;
    max-width: $max-width;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px 20px;
    align-items: flex-start;

    .description {
      background-color: white;
      padding: 5px;
      flex-grow: 1;
    }
    .owner {
      background-color: white;
      padding: 5px;
      display: grid;
      grid-template-columns: 100px 1fr;
      grid-template-rows: auto 56px 50px;

      h2 {
        grid-column: 1 / 3;
      }
      img {
        background-color: rgba(0, 0, 0, 0.144);
        width: 100%;
        height: auto;
        display: block;
        align-self: center;
        grid-row: 2 / 4;
        border-radius: 50px;
      }
      .info {
        // background-color: red;
        padding: 10px;
        padding-top: 15px;
        h3 {
          margin: 0;
        }
      }
      .controls {
        grid-column: 2 / 3;
      }
    }
  }
  @media screen and (max-width: 450px) {
    .main-content {
      margin: 0;
      grid-template-columns: 1fr;
      grid-template-rows: 50px 1fr min-content;

      img {
        grid-column: 1 / 2;
        grid-row: 1 / 3;
        height: auto;
      }
      .slider {
        display: flex;
        grid-column: 1 / 2;
        grid-row: 1 / 3;
        position: relative;
        justify-content: space-between;
        align-items: center;

        .scroll {
          display: block;
          margin: 20px;
          height: 32px;
          width: 32px;
          border-radius: 16px;
          box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.123);
          background-color: rgba(0, 0, 0, 0.075);
        }
        .dots {
          position: absolute;
          padding: 5px;
          bottom: 0;
          width: 100%;
          display: flex;
          justify-content: center;

          span {
            margin: 20px 5px;
            background-color: $primary-color-light;
            height: 5px;
            width: 5px;
            border-radius: 3px;
            display: block;
            box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.322);
            &.active {
              background-color: $primary-color-dark;
            }
          }
        }
      }
      .options {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        z-index: 1;
      }

      .details {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
        align-self: flex-start;
        padding: 5px;

        .controls {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
    .second {
      margin-top: 5px;
      grid-template-columns: 1fr;
    }
  }
}
</style>
