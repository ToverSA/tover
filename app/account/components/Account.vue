<template>
  <div class="account">
    <div class="sidebar" v-bind:class="{ opened: isSidebar }">
      <div class="header">
        <img src="../../../assets/images/tover_logo.png" alt="Tover logo">
        <h3>gumedesduduzo@gmail.com</h3>
      </div>
      <div @click="toCreate" class="list-item">
        <i class="material-icons">add</i>
        <span>Create new</span>
      </div>
      <div @click="toAdverts" class="list-item">
        <i class="material-icons">collections_bookmark</i>
        <span>Adverts</span>
      </div>
      <div @click="toProfile" class="list-item">
        <i class="material-icons">person_outline</i>
        <span>Profile</span>
      </div>
      <div class="list-item">
        <i class="material-icons">chat_bubble_outline</i>
        <span>Chat</span>
      </div>
      <div class="list-item">
        <i class="material-icons">exit_to_app</i>
        <span>Log out</span>
      </div>
    </div>
    <div class="main">
      <div class="navbar">
        <span @click="isSidebar = true"><i class="material-icons">menu</i></span>
        <h2>{{ section }}</h2>
      </div>
      <router-view class="main"/>
    </div>
  </div>
</template>

<script>
import store from '../../../store'
export default {
  data () {
    return {
      isSidebar: false
    }
  },
  computed: {
    section () {
      return this.$route.name;
    }
  },
  methods: {
    toCreate () {
      this.isSidebar = false;
    },
    toAdverts () {
      this.isSidebar = false;
      this.$router.push({ path: '/account' });
    },
    toProfile () {
      this.isSidebar = false;
      this.$router.push({ name: 'Profile' });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
div.account{
  display: flex;

  .sidebar{
    width: 320px;
    background-color: $primary-color;
    height: 100vh;
    @media screen and (max-width: 768px){
      width: 240px;
    }
    @media screen and (max-width: 450px){
      position: absolute;
      width: 100vw;
      transform: translateX(-100vw);
      &.opened{
        transform: translateX(0vw);
      }
    }

    .header{
      display: grid;
      grid-template-columns: 70px 1fr;
      padding: 20px 10px;
      padding-right: 0;
      background-color: $accent-color;

      img{
        width: 100%;
        display: block;
      }
      h3{
        margin: 0;
        color: $primary-color-text;
        font-family: Lato Bold;
        padding: 20px;
        padding-right: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .list-item{
      // background-color: red;
      margin: 10px 10px 0 50px;
      color: $primary-color-text;
      display: grid;
      grid-template-columns: 24px 1fr;
      padding: 10px;
      grid-gap: 10px;
      cursor: pointer;
      &:hover{
        background-color: $primary-color-dark;
      }

      span{
        padding: 2px;
      }
    }
  }
  .main{
    flex-grow: 1;
    height: calc(100vh - $bar-height);
    height: -moz-calc(100vh - $bar-height);
    height: -webkit-calc(100vh - $bar-height);
    overflow: auto;

    .navbar{
      display: none;
      height: $bar-height;
      grid-template-columns: minmax(0, $bar-height) 1fr;
      background-color: $primary-color;
      color: $primary-color-text;
      @media screen and (max-width: 450px){
        display: grid;
      }

      span{
        text-align: center;
        padding-top: 12px;
        cursor: pointer;
        color: $accent-color;
      }
      h2{
        margin: 0;
        padding: 10px;
      }
    }
  }
}
</style>
