<template lang="html">
  <div class="" @keyup.esc="escapeKeyPress()">
    <div class="loading"></div>
    <div class="error"></div>
    <div class="market-item-wrapper">
      <div class="main-content">
        <img src="../../../assets/images/placeholder.jpg" alt="">
        <h3 class="title">Lorem ipsum dolor sit amet.</h3>
      </div>
      <div class="side-content">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    escapeKeyListener: function(evt) {
      if (evt.keyCode === 27) {
        this.$router.go(-1);
      }
    }
  },
  created () {
    document.addEventListener('keyup', this.escapeKeyListener);
  },
  destroyed () {
    document.removeEventListener('keyup', this.escapeKeyListener);
  }
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
.market-item-wrapper{
  display: grid;
  grid-template-columns: 700px 1fr;
  padding-left: 100px;
  margin-top: 5px;

  @media screen and (max-width: 1024px){
    grid-template-columns: 500px 1fr;
  }
  @media screen and (max-width: 768px){
    grid-template-columns: 400px 1fr;
    padding-left: 70px;
  }
  @media screen and (max-width: 425px){
    display: block;
    padding: 0;
  }

  .main-content{
    background-color: #FFF;
    padding: 10px;
    display: grid;
    grid-template-columns: 250px 1fr 1fr;

    @media screen and (max-width: 1024px){
      grid-template-columns: 150px 1fr 1fr
    }

    @media screen and (max-width: 425px){
      grid-template-columns: 100px 1fr 1fr
    }

    img{
      width: 100%;
      height: auto;
    }

    h3.title{
      grid-column: 2 / 4;
      padding: 10px;
      margin: 0;
      overflow: hidden;
      position: relative;
      height: 8.4em;
      font-size: 1.6em;

      @media screen and (max-width: 1024px){
        font-size: 1.17em;
      }
      @media screen and (max-width: 425px){
        padding: 0;
        padding-left: 10px;
        font-size: 1em;
        height: 5.3em;
      }
    }
    h3.title:after {
      content: "";
      text-align: right;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 70%;
      height: 1.2em;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%);
    }
  }

  .side-content{
    height: 20px;
  }
}
</style>
