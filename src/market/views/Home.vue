<template lang="html">
  <div>
    <home-header/>
    <div class="section search">
      <h1>Get anything you want at a price best suited for you.</h1>
      <div class="search-input">
        <i class="material-icons">search</i>
        <input type="search">
      </div>
    </div>
    <div class="categories">
      <h1>BROWSE BY CATEGORY</h1>
      <router-link to="/market/books" class="box">
        <h2>Books & Study Material</h2>
        <i class="material-icons md-60">library_books</i>
      </router-link>
      <router-link to="/market/electronics" class="box">
        <h2>Electronics</h2>
          <i class="material-icons md-60">devices_other</i>
      </router-link>
      <router-link to="/market/foods" class="box">
        <h2>Food & Beverages</h2>
        <i class="material-icons md-60">local_dining</i>
      </router-link>
      <router-link to="/market/services" class="box">
        <h2>Services & Other</h2>
        <i class="material-icons md-60">local_library</i>
      </router-link>
    </div>
    <div class="create-account">
      <h1>BECOME A MERCHANT</h1>
      <h2>Selling your items here is easy and free. You just have to create an account that will give you all the tools you need to manage your assets online.</h2>
      <div class="button">
        <router-link :to="{ name: 'Auth', query: {_ref: 'get-started' } }">GET STARTED</router-link>
      </div>
    </div>
    <home-footer/>
  </div>
</template>

<script>
import HomeHeader from "../components/HomeHeader";
import HomeFooter from "../components/HomeFooter";
import store from "@/store";
export default {
  components: { HomeHeader, HomeFooter },
  data() {
    return {
      to: ""
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
div {
  background-color: $primary-color;

  > .search {
    max-width: 768px;
    margin: auto;
    display: grid;
    grid-gap: 10px;
    padding: 30px 0;
    @media screen and (max-width: 768px) {
      padding: 30px;
    }
    @media screen and (max-width: 425px) {
      padding: 30px 5px;
    }

    > h1 {
      color: $primary-color-text;
      font-family: OpenSans Bold;
      max-width: 500px;
    }
    > .search-input {
      background-color: $primary-color-text;
      display: flex;

      > i {
        padding: 7px;
        display: block;
        color: $primary-color;
      }
      > input {
        flex-grow: 1;
        border: none;
        outline: none;
        font-size: 1em;
        padding: 11px;
        padding-left: 0;
      }
    }
  }

  > .categories {
    background-color: $background-color;
    padding: 15px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    > h1 {
      text-align: center;
      color: $primary-color;
      grid-column: 1 / 5;
      @media screen and (max-width: 768px) {
        grid-column: 1 / 3;
      }
    }
    > .box {
      text-decoration: none;
      background-color: #fff;
      padding: 10px;
      text-align: center;
      cursor: pointer;
      display: grid;
      grid-template-rows: 1fr;
      @include no-select();
      color: $primary-color-dark;
      @media screen and (max-width: 425px) {
        grid-column: 1 / 3;
      }
    }
    > .box:hover {
      color: $accent-color;

      h2,
      i {
        opacity: 1;
      }
    }
  }
  .create-account {
    background-color: $background-color;
    padding: 10px 30px;

    > h1 {
      text-align: center;
      color: $primary-color;
    }
    > h2 {
      font-family: Lato Light;
    }
    // h1,
    h2,
    .button {
      max-width: 768px;
      margin-left: auto;
      margin-right: auto;
    }
    .button {
      display: block;
      background-color: $background-color;

      a {
        background-color: $accent-color;
        color: $primary-color-text;
        display: inline-block;
        padding: 15px 20px;
        cursor: pointer;
        text-decoration: none;
      }
    }
  }
}
</style>
