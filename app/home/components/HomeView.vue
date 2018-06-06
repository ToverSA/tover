<template lang="html">
  <div>
    <home-header></home-header>
    <div class="section search">
      <h1>Find anything that you're are you looking for at a price best suited for you.</h1>
      <input type="search" name="sesrch" placeholder="What are you looking for?">
      <div class="button theme border">
        <i class="material-icons md-18">search</i>
        <span>SEARCH</span>
      </div>
    </div>
    <div class="categories">
      <h1>Browse by category</h1>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
  </div>
</template>

<script>
import HomeHeader from './HomeHeader'
import HomeFooter from './HomeFooter'
export default {
  components: { HomeHeader, HomeFooter }
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';

div{
  background-color: $primary-color;

  .search{
    max-width: 768px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr) 110px;
    grid-column-gap: 10px;
    padding: 30px 0;
    @media screen and (max-width: 768px){
      padding: 30px;
    }
    @media screen and (max-width: 425px){
      padding: 30px 5px;
      grid-template-columns: repeat(4, 1fr) 40px;
    }

    h1{
      grid-column: 1 / 4;
      color: $primary-color-text;
      font-family: Lato Light;
      @media screen and (max-width: 768px){
        text-align: center;
        padding: 0 50px;
        grid-column: 1 / 6;
      }
      @media screen and (max-width: 425px){
        padding: 0;
      }
    }
    input{
      grid-column: 1 / 5;
      grid-row: 2 / 3;
      font-size: 1em;
      padding: 10px;
      border: none;
      outline: none;
    }
    .button{
      grid-row: 2 / 3;
      padding: 10px;
      display: flex;
      justify-content: center;
      i{
        display: block;
      }
      span{
        @media screen and (max-width: 425px){
          display: none;
        }
      }
    }
  }

  .categories{
    background-color: $background-color;
    padding: 15px;

    h1{
      color: $primary-color;
    }
  }
}

</style>
