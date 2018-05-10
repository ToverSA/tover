<template lang="html">
  <div id="home-header">
    <img src="../../../assets/images/tover.png" alt="">
    <div class="nav">
      <router-link to="account"><span class="account">SIGN IN</span></router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
div{
  display: flex;
  justify-content: space-between;
  height: $header-height;

  img{
    height: 100%;
  }
  .nav{
    display: flex;
    height: $header-height;
    padding: 0;

    a{
      text-decoration: none;
    }

    span{
      padding: 0 30px;
      height: $header-height;
      line-height: $header-height;
      display: block;
      color: #FFFFFF;
    }
  }
}
</style>
