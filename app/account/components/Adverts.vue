<template lang="html">
  <div class="adverts">
    <div class="row header">
      <span>Adverts</span>
      <span>Category</span>
      <span>Expires in</span>
    </div>
    <div class="row" v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]">
      <span>{{ i }} Adverts</span>
      <span>Category</span>
      <span>12 June</span>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
div.adverts{
  height: auto;
  padding: 5px;

  .row{
    background-color: #FFF;
    padding: 10px;
    display: grid;
    grid-template-columns: 2fr repeat(2, minmax(0, 1fr)) 30px;
    grid-gap: 10px;
    &.header{
      margin-bottom: 2px;
      color: rgba($primary-color, 0.8);
    }

    span{
      padding: 5px;
    }
  }
}
</style>
