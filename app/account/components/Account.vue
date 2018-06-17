<template>
  <div class="account">
    <div class="sidebar">
      <div class="header">
        <img src="../../../assets/images/tover_logo.png" alt="Tover logo">
        <h3>gumedesduduzo@gmail.com</h3>
      </div>
      <div class="list-item">
        <i class="material-icons">add</i>
        <span>Create new</span>
      </div>
      <div class="list-item">
        <i class="material-icons">collections_bookmark</i>
        <span>Adverts</span>
      </div>
      <div class="list-item">
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
    <div class="main"></div>
  </div>
</template>

<script>
import store from '../../../store'
export default {
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
div.account{
  display: flex;

  .sidebar{
    width: 320px;
    background-color: $primary-color;
    @media screen and (max-width: 768px){
      width: 240px;
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
        // background-color: green;
        padding: 2px;
      }
    }
  }
  .main{
    flex-grow: 1;
    height: 100vh;
    overflow: auto;
  }
}
</style>
