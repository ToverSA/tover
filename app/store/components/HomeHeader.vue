<template lang="html">
  <div id="home-header">
    <img src="../../../assets/images/tover.png" alt="Tover logo">
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
div{
  display: flex;
  justify-content: space-between;
  height: 55px;

  img{
    height: 100%;
  }
  .nav{
    display: flex;
    height: 55px;
    padding: 0;

    a{
      text-decoration: none;
    }

    span{
      padding: 0 30px;
      height: 55px;
      line-height: 55px;
      display: block;
      color: #FFFFFF;
    }
  }
}
</style>
