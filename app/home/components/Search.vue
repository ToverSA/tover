<template lang="html">
  <div class="search">
    <div class="search-bar">
      <span @click="goBack"><i class="material-icons">arrow_back</i></span>
      <input type="search" placeholder="Search in Electronics"/>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
div.search{
  background-color: $background-color;
  .search-bar{
    background-color: #FFF;
    height: $bar-height;
    display: grid;
    grid-template-columns: $bar-height 1fr;

    span{
      text-align: center;
      padding-top: 12px;
      color: $primary-color-dark;
      cursor: pointer;
    }
    input{
      width: 100%;
      border: none;
      padding: 5px;
      font-size: 1em;
      outline: none;
    }
  }
}
</style>
