<template lang="html">
  <div class="action-bar">
    <span @click="back()"><i class="material-icons md-24">arrow_back</i></span>
    <h3>Books &amp; Study Material</h3>
    <span><i class="material-icons md-24">search</i></span>
    <span><i class="material-icons md-24">person_outline</i></span>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
$bar-height: 50px;
div.action-bar{
  height: $bar-height;
  background-color: $primary-color;
  display: grid;
  grid-template-columns: $bar-height 1fr repeat(2, $bar-height);
  width: 100%;

  span{
    display: block;
    height: $bar-height;
    width: $bar-height;
    text-align: center;
    padding: 12px;
    color: #FFF;
    cursor: pointer;
  }
  span:hover{
    background-color: $primary-color-dark;
  }
  h3{
    margin: 0;
    padding: 14px 0;
    color: #FFF;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
