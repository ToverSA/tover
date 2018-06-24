<template lang="html">
  <div class="admin">
    <div class="sidebar">
      <h2>Heading</h2>
      <span><router-link :to="{ name: 'Analytics' }">Analytics</router-link></span>
      <span><router-link :to="{ name: 'Campuses' }">Campuses</router-link></span>
    </div>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
div.admin{
  display: grid;
  grid-template-columns: 320px 1fr;

  .sidebar{
    background-color: $primary-color;
    height: 100vh;

    h2{
      color: #FFF;
      margin: 0;
      padding: 30px;
      opacity: 0.5;
    }
    span{
      color: #FFF;
      font-family: Lato Bold;
      display: block;
      &:hover{
        background-color: rgba($primary-color-dark, 0.3);
      }
    }
    a{
      text-decoration: none;
      color: inherit;
      padding: 15px 10px 15px 50px;
      display: block;
    }
  }
  .main{
    height: 100vh;
    overflow: auto;
  }
}
</style>
