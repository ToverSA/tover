<template lang="html">
  <div class="action-bar">
    <router-link :to="{name: 'Home'}" title="Back"><i class="material-icons md-24">arrow_back</i></router-link>
    <h3 title="Category">{{ title }}</h3>
    <span @click="doSort" title="Sort By"><i class="material-icons md-24">sort</i></span>
    <span @click="doSearch" title="Search"><i class="material-icons md-24">search</i></span>
    <span @click="doAccount" title="My Account"><i class="material-icons md-24">person_outline</i></span>
  </div>
</template>

<script>
export default {
  created() {
    let category = this.$route.query.category;
    if (category == "books") {
      this.title = "Books & Study Material";
    } else if (category == "electronics") {
      this.title = "Electronics";
    } else if (category == "food") {
      this.title = "Food & Beverages";
    } else if (category == "services") {
      this.title = "Services & Other";
    } else {
      this.title = "All";
    }
  },
  data() {
    return {
      title: ""
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    doSearch() {
      this.$router.push({ path: "search" });
    },
    doSort() {},
    doAccount() {
      this.$router.push({ path: "account" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../app.scss";
$bar-height: 50px;
div.action-bar {
  height: $bar-height;
  background-color: $primary-color;
  display: grid;
  grid-template-columns: $bar-height 1fr repeat(3, $bar-height);
  width: 100%;

  a,
  span {
    display: block;
    height: $bar-height;
    width: $bar-height;
    text-align: center;
    padding: 12px;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    @include no-select();
  }
  span:hover {
    background-color: $primary-color-dark;
  }
  h3 {
    margin: 0;
    padding: 14px 0;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
}
</style>
