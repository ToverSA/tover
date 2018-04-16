<template lang="html">
<div class="market-wrapper">
  <div class="market-header">
    <!-- Put some header items here -->
  </div>
  <div class="p-s">
    <div class="market-item" @click="test(i)" v-for="i in [1, 2, 3, 4, 5, 6, 7]">{{i}}</div>
  </div>
</div>
</template>

<script>
export default {
  methods: {
    test: function (id) {
      console.log(this.$router);
      this.$router.push({ name: 'MarketItem', params: { id }});
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';

.market-wrapper{
  
  .market-header{
    height: $header-height;
  }
  .p-s{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    padding: 0 10px;
    max-width: 1024px;
    width: 100%;
    margin: auto;
    align-items: center;
    justify-items: center;

    @media screen and (max-width: 1024px){
      grid-template-columns: repeat(4, 1fr);
      max-width: 768px;
    }

    @media screen and (max-width: 768px){
      max-width: 700px;
    }

    @media screen and (max-width: 425px){
      max-width: 360px;
      padding: 0;
      grid-template-columns: repeat(3, 1fr);
    }

    .market-item{
      background-color: #FFF;
      margin: 5px;
      height: 100px;
      width: 170px;

      @media screen and (max-width: 768px){
        width: 125px;
      }

      @media screen and (max-width: 425px){
        width: 95px;
      }
    }
  }
}
</style>
