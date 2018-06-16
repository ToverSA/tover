<template lang="html">
  <div class="store">
    <action-bar/>
    <div class="content">
      <div class="box" v-for="i in [1, 2, 3, 4, 5]" @click="goto(i)">
        <img src="../../../assets/images/albumart.jpg">
        <h3>R123 456</h3>
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse nostrum id sapiente cupiditate perspiciatis quasi!</span>
      </div>
    </div>
  </div>
</template>

<script>
import ActionBar from './ActionBar';
export default {
  components: { ActionBar },
  data () {
    return {  }
  },
  methods: {
    goto (id) {
      this.$router.push({ name: 'StoreItem', params: { id: id } });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
div.store {

  div.content {
    padding: 10px;
    margin: auto;
    width: 90%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: 450px) {
      grid-template-columns: repeat(3, 1fr);
      width: 100%;
    }

    .box{
      background-color: #FFF;
      padding: 10px;
      cursor: pointer;
      @include no-select();
      @media screen and (max-width: 450px) {
        padding: 5px;
      }

      img{
        width: 100%;
        display: block;
      }
      h3{
        margin: 5px 0;
      }
      span{
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
      }
    }
  }
}
</style>
