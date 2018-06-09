<template lang="html">
  <div class="markets">
    <action-bar/>
    <div class="item-gallery" v-if="page == 'gallery'">
      <img src="../../../assets/images/albumart.jpg">
      <span><i class="material-icons">navigate_before</i></span>
      <span><i class="material-icons">navigate_next</i></span>
    </div>
    <div class="item-view" v-else-if="page == 'item'">
      <div class="main">
        <img src="../../../assets/images/albumart.jpg" @click="viewGallery">
        <span class="title">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, laborum maiores sunt? Neque atque reprehenderit, tenetur voluptas</span>
        <div class="divider">
          <span class="price">R123 456</span>
          <div class="buttons">
            <div class="button theme">
              <span>CHAT</span>
            </div>
            <div class="button theme">
              <span>CALL</span>
            </div>
          </div>
        </div>
        <span class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores debitis sapiente ipsa et quidem quaerat eligendi laborum illum labore praesentium alias perspiciatis libero voluptatibus odit doloremque minus doloribus corporis, dolore, enim quis ad voluptas incidunt eveniet. Repudiandae possimus nisi et expedita ea eligendi facere, voluptatem odit, similique, consectetur accusamus provident odio fugit dignissimos doloremque illo! Tenetur, voluptate. Alias repellendus optio omnis molestias in ipsum ab explicabo dignissimos earum. Quis voluptate ipsam magni amet consequatur commodi minima fugit odio, vitae quo, vero dolorum est assumenda animi nihil aspernatur. Illo nesciunt, vero blanditiis eos, dolor dolores sunt impedit, fuga dicta fugit quibusdam.</span>
      </div>
      <div class="suggest"></div>
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
    viewItem (id) {
      let path = this.$route.path;
      this.$router.push({ path, query: {id} });
    },
    viewGallery () {
      console.log('gallery');
      let path = this.$route.path;
      let id = this.$route.query.id;
      this.$router.push({ path, query: { id: id, viewing: true } });
    }
  },
  beforeRouteEnter (to, from, next) {
    next(self => {
      if ('id' in to.query){
        if ('viewing' in to.query){
          self.page = 'gallery';
        } else {
          self.page = 'item';
        }
      } else {
        self.page = '';
      }
    });
  },
  beforeRouteUpdate (to, from, next) {
    if ('id' in to.query){
      if ('viewing' in to.query){
        console.log('view set');
        this.page = 'gallery';
      } else {
        this.page = 'item';
      }
    } else {
      this.page = '';
    }
    next();
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
        height: 2.5em;
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
  padding: 10px;
  grid-template-columns: minmax(600px, 2fr) minmax(400px, 1fr);
  @media screen and (max-width: 1024px){
    grid-template-columns: minmax(400px, 2fr) minmax(200px, 1fr);
  }
  @media screen and (max-width: 768px){
    grid-template-columns: 1fr;
  }

  .main{
    background-color: #FFF;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    padding: 20px;
    @media screen and (max-width: 450px){
      padding: 5px;
    }

    img{
      width: 100%;
    }
    span{
      padding: 10px 0;
    }
    .title{
      grid-column: 2 / 4;
      padding: 0;
      font-size: 1.5em;
      @media screen and (max-width: 768px){
        font-size: 1.25em;
      }
      @media screen and (max-width: 450px){
        font-size: 1em;
      }
    }
    .divider{
      grid-column: 1 / 4;
      display: flex;
      justify-content: space-between;
    }
    .button{
      padding: 10px 15px;
    }
    .description{
      grid-column: 1 / 4;
    }
  }
  .suggest{}
}
div.item-gallery{
  position: fixed;
  background-color: #0009;
  height: 100%;
  width: 100%;

  img{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  span{
    position: absolute;
    color: #FFF;
    top: 50%;
    transform: translateY(-50%);
    background-color: #0006;
    padding: 15px;
    @include no-select();
    &:last-child{
      right: 0;
    }
  }
}
</style>
