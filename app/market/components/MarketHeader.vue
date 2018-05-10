<template lang="html">
  <div class="market-header-wrapper">
    <img src="../../../assets/images/Ako.png" alt="" @click="home()">
  </div>
</template>

<script>
export default {
  methods: {
    home: function () {
      this.$router.push({ path: '/' });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
.market-header-wrapper{
  height: $header-height;
  background-color: $market-color;
  display: grid;
  grid-template-columns: $header-height repeat(3, 1fr);



  img{
    width: $header-height * 3;
    height: $header-height;
    padding-right: $header-height * 2;
    @include logo-gradient($home-color, $market-color);
  }
}
</style>
