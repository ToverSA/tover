<template lang="html">
  <div class="market-asset">
    <div class="main">
      <div class="asset">
        <img src="../../../assets/images/albumart.jpg" alt="">
        <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, excepturi.</h3>
        <span>24 June</span>
        <span>R123 456</span>
        <div class="controls">
          <div @click="goBack" class="button light">
            <i class="material-icons md-20">close</i>
          </div>
          <div class="spacer"></div>
          <div class="button light">
            <i class="material-icons md-20">more_horiz</i>
            <span>MORE</span>
          </div>
          <a href="tel:0734004593" class="button">
            <i class="material-icons md-20">call</i>
            <span class="not-mobile">CALL</span>
            <span class="mobile">073 400 4590</span>
          </a>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, iste.</p>
      </div>
      <div class="list"></div>
    </div>
    <div class="side">
      <div class="image-viewer">
        <img src="../../../assets/images/albumart.jpg" v-for="i in [1, 2, 3, 4, 5, 6]" @click="viewImage(i)">
      </div>
      <div class="fullscreen-viewer" v-if="fullScreen">
        <img src="../../../assets/images/albumart.jpg" alt="">
        <div class="buttons side">
          <i class="material-icons" @click="fullScreen = false">close</i>
          <!-- <i class="material-icons">more_vert</i> -->
        </div>
        <div class="buttons bottom">
          <i class="material-icons">chevron_left</i>
          <span></span>
          <i class="material-icons">chevron_right</i>
        </div>
      </div>
      <!-- <div class="suggest">SUGGEST</div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullScreen: false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    viewImage(id) {
      this.fullScreen = true;
    },
    cancelChat() {
      this.isChatbox = false;
    },
    okChat() {}
  }
};
</script>

<style lang="scss" scoped>
@import "../../app.scss";
div.market-asset {
  max-width: 1148px;
  margin: auto;
  display: grid;
  grid-template-columns: 450px 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 20px;
  padding: 20px;
  align-items: flex-start;
  @media screen and (max-width: 768px) {
    padding: 10px;
    grid-column-gap: 10px;
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
  }

  .main {
    padding: 0px;

    .asset {
      display: grid;
      grid-template-columns: 100px 1fr 1fr;
      grid-template-rows: 70px 30px;
      grid-column-gap: 5px;
      background-color: #fff;
      padding: 20px;
      @media screen and (max-width: 450px) {
        padding: 5px;
      }

      img {
        width: 100%;
        height: 100%;
        display: block;
        grid-row: 1 / 3;
      }
      h3 {
        grid-column: 2 / 4;
        margin: 0;
        overflow: hidden;
        height: 70px;
      }
      span {
        display: block;
        padding: 5px 0;
        &:nth-child(4) {
          text-align: right;
        }
      }
      .controls {
        grid-column: 1 / 4;
        margin: 20px 0;
        display: flex;
        justify-content: flex-end;
        @media screen and (max-width: 450px) {
        }
        .spacer {
          flex-grow: 1;
        }
        .button {
          text-decoration: none;
          background-color: $accent-color;
          color: $primary-color-text;
          display: flex;
          padding: 5px 15px;
          margin-left: 5px;
          cursor: pointer;
          &.light {
            background-color: rgba($accent-color, 0.1);
            color: $accent-color;
            padding: 5px;
            margin: 0;
          }
          i {
            display: block;
            padding: 5px;
          }
          span {
            display: block;
            padding: 5px;
            &.mobile {
              @media screen and (max-width: 768px) {
                display: none;
              }
            }
            &.not-mobile {
              display: none;
              @media screen and (max-width: 768px) {
                display: block;
                @media screen and (max-width: 450px) {
                  background-color: yellow;
                  display: none;
                }
              }
            }
            @media screen and (max-width: 450px) {
              background-color: yellow;
              display: none;
            }
          }
        }
      }
      p {
        grid-column: 1 / 4;
        margin: 0;
        white-space: pre-line;
      }
    }
    .list {
      padding: 20px;
      margin-top: 20px;
      background-color: #fff;
    }
  }
  .side {
    background-color: transparent;
    width: 100%;

    .image-viewer {
      background-color: #fff;
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      padding: 10px;
      width: 100%;
      grid-gap: 10px;
      @media screen and (max-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr;
      }
      @media screen and (max-width: 450px) {
        display: none;
      }

      i {
        display: none;
      }
      > img {
        display: block;
        width: 100%;
        object-fit: cover;
        &:nth-child(1) {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }
        &:nth-child(2) {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        }
        &:nth-child(3) {
          grid-column: 1 / 3;
          grid-row: 2 / 4;
        }
        &:nth-child(4) {
          grid-column: 3 / 5;
          grid-row: 1 / 3;
        }
        &:nth-child(5) {
        }
        &:nth-child(6) {
        }
        @media screen and (max-width: 768px) {
          &:nth-child(1) {
            grid-column: 3 / 4;
            grid-row: 1 / 2;
          }
          &:nth-child(2) {
            grid-column: 3 / 4;
            grid-row: 2 / 3;
          }
          &:nth-child(3) {
            grid-column: 1 / 3;
            grid-row: 1 / 3;
            // padding: 10px;
            // display: none;
          }
          &:nth-child(4) {
            grid-column: 1 / 2;
            grid-row: 3 / 4;
          }
          &:nth-child(5) {
            grid-column: 1 / 2;
            grid-row: 4 / 5;
          }
          &:nth-child(6) {
            grid-column: 2 / 4;
            grid-row: 3 / 5;
          }
        }
      }
    }
    .fullscreen-viewer {
      position: fixed;
      height: 100vh;
      width: 100vw;
      overflow: auto;
      background-color: rgba(#000, 0.9);
      top: 0;
      left: 0;

      img {
        display: block;
        margin: auto;
        height: 100%;
        width: 100%;
        object-fit: contain;
        padding: 5px;
      }
      .buttons {
        position: absolute;
        width: auto;
        height: auto;
        &.side {
          top: 0;
          right: 0;
        }
        &.bottom {
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          width: 300px;
          span {
            display: block;
            // background-color: red;
            flex-grow: 1;
          }
        }
        i {
          display: block;
          height: 50px;
          width: 50px;
          color: $accent-color;
          background-color: #ffffff;
          margin: 10px;
          padding: 13px;
          border-radius: 25px;
          cursor: pointer;
          box-shadow: 0 1px 2px 1px rgba($accent-color, 0.2);
        }
      }
    }
    .suggest {
      background-color: #fff;
      margin-top: 20px;
    }
  }
}
</style>
