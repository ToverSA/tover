<template lang="html">
  <div id="home-header">
    <img src="../../../assets/images/Ako.png" alt="">
    <div class="nav">
      <router-link to="market"><span class="market">Market</span></router-link>
      <span>Events</span>
      <router-link to="account"><span class="login">Login</span></router-link>
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
  padding: 20px;

  img{
    height: 50px;
    width: 50px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 25px;
    padding: 5px;
  }
  .nav{
    display: flex;
    height: 50px;
    padding: 0;

    a{
      text-decoration: none;

      .market:hover{
        background-color: $market-color;
      }
      .login:hover{
        background-color: $market-color;
      }
    }

    span{
      padding: 0 30px;
      height: 50px;
      line-height: 50px;
      display: block;
      color: #FFFFFF;
    }
  }
}
</style>
