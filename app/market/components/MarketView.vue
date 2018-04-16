<template lang="html">
  <transition name="market-anim">
    <div class="market-wrapper">
      <div class="market-header">
        <!-- Put some header items here -->
      </div>
      <div class="p-s">
        <div class="market-item" @click="test(i)" v-for="i in [1, 2, 3, 4, 5, 6]">
          <img src="../../../assets/images/placeholder.jpg" alt="Placeholder">
          <p class="title">Lorem ipsum dolor sgt amet, consectetur adipisicing elit. Nulla, dolorum?</p>
          <h2 class="price">R200</h2>
          <span>09/06/18</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    test: function (id) {
      console.log(this.$router);
      this.$router.push({ name: 'MarketItem', params: { id }});
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
.market-anim-enter-active{
  animation: market-enter-anim .2s;
}

.market-anim-enter-active {
  *{
    visibility: hidden;
  }
}

.market-wrapper{

  .market-header{
    height: $header-height;
  }
  .p-s{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    padding: 0 10px;
    max-width: 1024px;
    width: 100%;
    margin: auto;
    align-items: center;
    justify-items: center;

    @media screen and (max-width: 1024px){
      grid-template-columns: repeat(4, 1fr);
      max-width: 768px;
    }

    @media screen and (max-width: 768px){
      max-width: 700px;
    }

    @media screen and (max-width: 425px){
      max-width: 360px;
      padding: 0;
      grid-template-columns: repeat(3, 1fr);
    }

    .market-item{
      background-color: #FFF;
      margin: 5px;
      width: 170px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      padding: 5px;
      cursor: pointer;

      @media screen and (max-width: 768px){
        width: 125px;
      }

      @media screen and (max-width: 425px){
        width: 95px;
      }

      img{
        width: 100%;
        height: auto;
        grid-column: 1 / 3;
      }

      p.title{
        grid-column: 1 / 3;
        overflow: hidden;
        position: relative;
        height: 2.8em;
        margin: 5px 0;
      }
      p.title:after {
        content: "";
        text-align: right;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 50%;
        height: 1.2em;
        background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%);
      }

      h2.price{
        margin: 0;
      }
      span{
        opacity: 0.5;
        align-self: end;
        text-align: right;
      }
    }
  }
}
</style>
