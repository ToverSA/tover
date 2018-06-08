<template lang="html">
  <div>
    <home-header/>
    <div class="section search">
      <h1>Find anything that you're looking for at a price best suited for you.</h1>
      <input type="search" name="sesrch" placeholder="What are you looking for?">
      <div class="button theme">
        <i class="material-icons md-18">search</i>
      </div>
    </div>
    <div class="categories">
      <h1>Browse by category</h1>
      <div class="box" @click="nav('books')">
        <h2>Books & Study Material</h2>
        <i class="material-icons md-60">library_books</i>
      </div>
      <div class="box" @click="nav('electronics')">
        <h2>Electronics</h2>
          <i class="material-icons md-60">devices_other</i>
      </div>
      <div class="box" @click="nav('services')">
        <h2>Services & Other</h2>
        <i class="material-icons md-60">room_service</i>
      </div>
      <div class="box" @click="nav('events')">
        <h2>Events</h2>
        <i class="material-icons md-60">event_note</i>
      </div>
    </div>
    <home-footer/>
  </div>
</template>

<script>
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';
import store from '../../../store';
export default {
  components: { HomeHeader, HomeFooter },
  methods: {
    nav (to) {
      if (store.getters.campusSet){
        this.$router.push({path: to});
      } else {
        this.$emit('pick-campus');
      }
    }
  }
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
    grid-template-columns: repeat(4, 1fr) 40px;
    grid-column-gap: 10px;
    padding: 30px 0;
    @media screen and (max-width: 768px){
      padding: 30px;
    }
    @media screen and (max-width: 425px){
      padding: 30px 5px;
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
      background-color: $primary-color;
      i{
        display: block;
      }
    }
    .button:hover{
      background-color: $primary-color-dark;
    }
  }

  .categories{
    background-color: $background-color;
    padding: 15px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    @media screen and (max-width: 768px){
      grid-template-columns: repeat(2, 1fr);
    }

    h1{
      color: $primary-color;
      font-family: Lato Light;
      grid-column: 1 / 5;
      @media screen and (max-width: 768px){
        grid-column: 1 / 3;
      }
    }
    .box{
      background-color: #FFF;
      padding: 10px;
      text-align: center;
      cursor: pointer;
      display: grid;
      grid-template-rows: 1fr;
      @include no-select();
      @media screen and (max-width: 425px){
        grid-column: 1 / 3;
      }

      h2, i{
        opacity: 0.5;
      }
    }
    .box:hover{
      color: $accent-color;

      h2, i{
        opacity: 1;
      }
    }
  }
}

</style>
