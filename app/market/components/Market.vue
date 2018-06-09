<template lang="html">
  <div class="markets">
    <action-bar/>
    <div class="item-gallery" v-if="page == 'gallery'">
      gallery
    </div>
    <div class="item-view" v-else-if="page == 'item'">
      <img src="../../../assets/images/albumart.jpg">
      <span class="title">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia.</span>
      <div class="controls">
        <span class="price">R123 456</span>
        <div class="buttons">
          <span class="button theme">MESSAGE</span>
          <span class="button theme">CALL</span>
        </div>
      </div>
      <span class="description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint tempora fugit quidem rerum esse ullam obcaecati, veniam, sed assumenda sunt dolorum eligendi amet, maxime animi perferendis, doloremque fuga alias reiciendis unde voluptas quasi quae magnam placeat id? Praesentium architecto quo maiores repellendus alias quibusdam, mollitia, corrupti dolorum eligendi at voluptatem.
      </span>
    </div>
    <div class="list-items" v-else>
      <div class="item" v-for="i in [1, 2, 3, 4]" @click="viewItem(i)">
        <img src="../../../assets/images/albumart.jpg">
        <span class="price">R123 456</span>
        <span class="date">24 Jun 2018</span>
        <span class="title">Lorem ipsum dolor sit amgqet, consectetur adipisicing elit. Quos quisquam dicta cum minus quasi eius culpa, dolorem maiores fuga! Nemo.</span>
      </div>
    </div>
  </div>
</template>

<script>
import ActionBar from './ActionBar';
export default {
  components: { ActionBar },
  data () {
    return {
      page: ''
    }
  },
  methods: {
    viewItem (i) {
      console.log("item "+ i + " clicked");
      this.page = 'item';
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
div.list-items{
  padding: 20px;
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  @media screen and (max-width: 768px){
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 450px){
    padding: 10px;
  }
  @media screen and (max-width: 425px){
    grid-template-columns: repeat(3, 1fr);
    padding: 5px;
  }
  .item{
    background-color: #FFF;
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    cursor: pointer;
    @media screen and (max-width: 425px){
      padding: 2px;
    }
    @include no-select();

    img{
      width: 100%;
      grid-column: 1 / 3;
    }
    span.price{
      font-family: Lato Bold;
    }
    span.price, span.date{
      font-size: 1.3em;
      @media screen and (max-width: 1024px){
        font-size: 1.1em;
      }
      @media screen and (max-width: 450px){
        grid-column: 1 / 3;
      }
    }
    span.date{
      text-align: right;
      color: $primary-color-dark;
      @media screen and (max-width: 450px){
        display: none;
      }
    }
    span.title{
      grid-column: 1 / 3;
      position: relative;
      height: 2.5em;
      overflow: hidden;

      @media screen and (max-width: 450px){
        font-size: 0.7em;
        height: 2.7em;
      }
      &:after {
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
  }
}
div.item-view{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  padding: 20px;
  @media screen and (max-width: 768px){
    padding: 10px;
  }

  img{
    width: 100%;
  }
  span.title{
    grid-column: 2 / 4;
    font-size: 1.2em;
  }
  div.controls{
    grid-column: 1 / 4;
    display: flex;
    justify-content: space-between;

    span{
      display: inline-block;
      padding: 10px 0;
      font-family: Lato Bold;
    }
    .buttons{
      @include no-select();

      span{
        padding: 10px 15px;
      }
    }
  }
  span.description{
    grid-column: 1 / 4;
  }
}
</style>
