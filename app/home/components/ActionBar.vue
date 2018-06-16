<template lang="html">
  <div class="action-bar">
    <span @click="back()"><i class="material-icons md-24">arrow_back</i></span>
    <h3>{{ title }}</h3>
    <span @click="doSearch"><i class="material-icons md-24">sort</i></span>
    <span @click="doSearch"><i class="material-icons md-24">search</i></span>
    <span><i class="material-icons md-24">person_outline</i></span>
  </div>
</template>

<script>
export default {
  created () {
    let category = this.$route.query.category;
    if (category == 'books') {
      this.title = 'Books & Study Material';
    } else if (category == 'electronics') {
      this.title = 'Electronics';
    } else if (category == 'services') {
      this.title = 'Services & Other';
    } else if (category == 'Events') {
      this.title = 'Events';
    } else {
      this.title = 'All';
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
  grid-template-columns: $bar-height 1fr repeat(3, $bar-height);
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
