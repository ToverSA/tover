<template lang="html">
  <div class="adverts">
    <div class="row header">
      <span>Adverts</span>
      <span>Category</span>
      <span>Expires in</span>
      <span>Views</span>
    </div>
    <div class="row" v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]">
      <span>Example of a title</span>
      <span class="label">category</span>
      <span class="value">Books & study materials</span>
      <span class="label">Expires in</span>
      <span class="value">12 June</span>
      <span class="label">Views</span>
      <span class="value">2345</span>
      <span><i class="material-icons">star</i></span>
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
    grid-template-columns: 5fr 4fr repeat(2, minmax(0, 2fr)) 30px;
    grid-gap: 10px;
    @media screen and (max-width: 768px){
      grid-template-columns: 1fr 2fr 30px;
      margin-bottom: 2px;
    }
    &:not(.header){
      cursor: pointer;
    }
    &.header{
      margin-bottom: 2px;
      color: rgba($primary-color, 0.8);
      @media screen and (max-width: 768px){
        span:not(:first-child){
          display: none;
        }
      }
    }

    span{
      padding: 5px;
      font-family: Lato Bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:first-child{
        @media screen and (max-width: 768px){
          grid-column: 1 / 3;
        }
      }
      &:last-child{
        padding: 0;
        padding-top: 5px;
        padding-left: 2px;
        @media screen and (max-width: 768px){
          grid-column: 3 / 4;
          grid-row: 1 / 2;
        }
      }
      &.label{
        display: none;
        @media screen and (max-width: 768px){
          display: block;
          color: $primary-color;
          text-align: right;
        }
      }
      &.value{
        @media screen and (max-width: 768px){
          grid-column: 2 / 4;
        }
      }
    }
  }
}
</style>
