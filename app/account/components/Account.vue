<template>
  <div class="account">
    <div class="sidebar">
      hello
    </div>
    <div class="main"></div>
  </div>
</template>

<script>
import store from '../../../store'
export default {
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
div.account{
  display: flex;

  .sidebar{
    flex-basis: 320px;
    background-color: $primary-color;
    @media screen and (max-width: 768px){
      flex-basis: 240px;
    }
  }
  .main{
    flex-grow: 1;
    height: 100vh;
    overflow: auto;
  }
}
</style>
