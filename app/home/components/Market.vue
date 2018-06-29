<template lang="html">
  <div class="store">
    <action-bar/>
    <div class="content">
      <div class="box" v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]" @click="goto(i)">
        <img src="../../../assets/images/albumart.jpg">
        <h3>R123 456</h3>
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, excepturi.</span>
      </div>
    </div>
  </div>
</template>

<script>
import ActionBar from "./ActionBar";
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
div.store {
  div.content {
    padding-top: 10px;
    margin: auto;
    width: 100%;
    max-width: 1200px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    grid-row-gap: 10px;
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
    }

    .box {
      background-color: #fff;
      cursor: pointer;
      margin: auto;
      padding: 20px;
      width: 200px;
      @include no-select();
      @media screen and (max-width: 1024px) {
        width: 200px;
      }
      @media screen and (max-width: 768px) {
        padding: 10px;
        width: 150px;
      }
      @media screen and (max-width: 450px) {
        padding: 10px;
        width: 140px;
      }
      @media screen and (max-width: 425px) {
        width: 120px;
        padding: 5px;
      }
      @media screen and (max-width: 375px) {
        padding: 5px;
        width: 100px;
      }

      img {
        width: 100%;
        display: block;
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
