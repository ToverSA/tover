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
            <i class="material-icons md-20">more_vert</i>
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
      <div class="image-viewer">IV</div>
      <div class="suggest">SUGGEST</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChatbox: false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    doChat() {
      this.isChatbox = true;
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

    .image-viewer {
      background-color: #fff;
    }
    .suggest {
      background-color: #fff;
      margin-top: 20px;
    }
  }
}
</style>
