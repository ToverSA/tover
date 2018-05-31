<template lang="html">
  <div>
    <home-header></home-header>
    <div class="section search">
      <h1>Find anything that you're are you looking for at a price best suited for you.</h1>
      <input type="search" name="sesrch" placeholder="What are you looking for?">
      <div class="button theme border">
        <span>SEARCH</span>
      </div>
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
    grid-template-columns: repeat(4, 1fr) 100px;
    grid-column-gap: 10px;
    padding: 30px 0;

    h1{
      grid-column: 1 / 4;
      color: $primary-color-text;
      font-family: Lato;
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
      text-align: center;
    }
  }
}

</style>
