<template lang="html">
  <div id="home-header">
    <img src="@/assets/images/tover.png" alt="Tover logo">
    <div class="nav">
      <router-link :to="{ name: 'CreateAdvert' }"><span class="account">SELL</span></router-link>
      <router-link to="account"><span class="account">MY ACCOUNT</span></router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  justify-content: space-between;
  height: 55px;

  img {
    height: 100%;
    @media screen and (max-width: 425px) {
      height: 60%;
      margin: 12px 0;
    }
  }
  .nav {
    display: flex;
    height: 55px;
    padding: 0;

    a {
      text-decoration: none;
    }

    span {
      padding: 0 20px;
      height: 55px;
      line-height: 55px;
      display: block;
      color: #ffffff;
    }
  }
}
</style>
