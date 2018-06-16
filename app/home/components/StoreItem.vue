<template lang="html">
  <div class="store-item">
    <div class="navbar">
      <span><i class="material-icons">arrow_back</i></span>
    </div>
    <div class="main"></div>
    <div class="suggest"></div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
div.store-item{

  .navbar{
    height: $bar-height;
    display: grid;
    grid-template-columns: $bar-height 1fr;

    span{
      text-align: center;
      padding-top: 12px;
      cursor: pointer;
      color: $primary-color-dark;
    }
  }
}
</style>
