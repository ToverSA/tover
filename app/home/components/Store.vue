<template lang="html">
  <div class="store">
    <action-bar/>
    <div class="content">
      <div class="box" v-for="i in [1, 2, 3, 4, 5]"></div>
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
  methods: {  }
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
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }

    .box{
      background-color: #FFF;
      padding: 10px;
      min-height: 200px;
    }
  }
}
</style>
