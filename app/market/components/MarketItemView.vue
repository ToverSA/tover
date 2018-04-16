<template lang="html">
<div class="market-item-wrapper">
  <div class="main-content">

  </div>
  <div class="side-content">

  </div>
</div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import '../../app.scss';
.market-item-wrapper{
  display: grid;
  grid-template-columns: 700px 1fr;
  padding-left: 100px;

  @media screen and (max-width: 1024px){
    grid-template-columns: 500px 1fr;
  }
  @media screen and (max-width: 768px){
    grid-template-columns: 400px 1fr;
    padding-left: 70px;
  }
  @media screen and (max-width: 425px){
    display: block;
    padding: 0;
  }

  .main-content{
    background-color: #FFF;
    padding: 10px;
  }

  .side-content{
    background-color: red;
    height: 20px;
  }
}
</style>
