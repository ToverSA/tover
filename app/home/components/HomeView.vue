<template lang="html">
  <div>
    <home-header></home-header>
    <!-- <home-footer></home-footer> -->
    <div class="search">
      <h1>THIS IS WHERE YOU BUY OR SELL... WHATEVER.</h1>
      <h1>WHAT ARE YOU LOOKING FOR?</h1>
      <input type="search" name="search" value="" placeholder="search : SHYD321, economics, hp battery, etc.">
    </div>
    <div class="browser">
      <h1>BROWSE CATEGORIES</h1>
      <div class="cat-1">
        <h3>BOOKS & STUDY MATERIAL</h3>
      </div>
      <div class="cat-2">
        <h3>ELECTRONICS</h3>
      </div>
      <div class="cat-3">
        <h3>SERVICES</h3>
      </div>
      <div class="cat-4">
        <h3>EVENTS</h3>
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
  background-color: $color-primary-0;
}
.search{
  color: #FFF;
  padding: 50px;
  text-align: center;
  max-width: 1024px;
  margin: auto;

  >h1{
    font-family: OpenSans ExtraBold;
  }
  >input{
    background-color: rgba(255, 255 ,255, 0.9);
    padding: $input-padding;
    border: none;
    width: 100%;
    max-width: 768px;
    font-family: OpenSans;
    outline: none;
    font-size: 1em;
  }
}
.browser{
  background-color: $background-color;
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px 15px;

  >h1{
    font-family: OpenSans Light;
    color: $color-primary-4;
    text-align: center;
    grid-column: 1 / 5;
  }
  >div{
    background-color: #FFF;
    min-height: 20px;
    min-width: 20px;
    padding: 15PX;

    >h3{
      text-align: center;
      color: $color-primary-1;
    }
  }
  >div.cat-1{}
  >div.cat-2{}
  >div.cat-3{}
  >div.cat-4{}

}
</style>
