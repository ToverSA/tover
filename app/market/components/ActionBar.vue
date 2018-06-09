<template lang="html">
  <div class="action-bar">
    <span @click="back()"><i class="material-icons md-24">arrow_back</i></span>
    <h3>{{ title }}</h3>
    <span @click="doSearch"><i class="material-icons md-24">search</i></span>
    <span><i class="material-icons md-24">person_outline</i></span>
  </div>
</template>

<script>
export default {
  created () {
    if (this.$route.name == 'Books') {
      this.title = 'Books & Study Material';
    } else if (this.$route.name == 'Electronics') {
      this.title = 'Electronics';
    } else if (this.$route.name == 'Services') {
      this.title = 'Services & Other';
    } else if (this.$route.name == 'Events') {
      this.title = 'Events';
    }
  },
  data () {
    return {
      title: ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    doSearch () {
      let route = this.$route.name;
      this.$router.push({ path: 'search', query: {category: route } });
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
    @include no-select();
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
