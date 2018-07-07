<template lang="html">
  <div class="market">
    <action-bar/>
    <div class="content">
      <router-link :to="{ name: 'MarketAsset', params: { id: i } }" class="box" v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]" @click="goto(i)">
        <img src="@/assets/images/albumart.jpg">
        <h3>R123 456</h3>
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, excepturi.</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import ActionBar from "../components/ActionBar";
export default {
  components: { ActionBar },
  data() {
    return {};
  },
  methods: {
    goto(id) {
      this.$router.push({ name: "MarketAsset", params: { id: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../app.scss";
div.market {
  div.content {
    padding-top: 10px;
    margin: auto;
    width: 100%;
    max-width: 1200px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    align-items: center;
    grid-row-gap: 40px;
    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
      max-width: 900px;
    }
    @media screen and (max-width: 768px) {
      max-width: 650px;
    }
    @media screen and (max-width: 450px) {
      grid-template-columns: repeat(3, 1fr);
      width: 100%;
      grid-row-gap: 0;
    }

    .box {
      background-color: #fff;
      cursor: pointer;
      margin: auto;
      width: 160px;
      @include no-select();
      color: #000;
      box-shadow: 0 1px 1px 2px rgba(#ccc, 0.3);
      text-decoration: none;
      @media screen and (max-width: 1024px) {
        width: 200px;
      }
      @media screen and (max-width: 768px) {
        width: 140px;
      }
      @media screen and (max-width: 450px) {
        padding: 5px;
        width: 100%;
      }

      img {
        width: 100%;
        display: block;
      }
      h3,
      span {
        padding: 0 5px;
        @media screen and (max-width: 450px) {
          padding: 0;
        }
      }
      h3 {
        margin: 5px 0;
      }
      span {
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
      }
    }
  }
}
</style>
