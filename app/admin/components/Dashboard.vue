<template lang="html">
  <div class="admin">
    <div class="sidebar">
      <router-link :to="{ name: 'Analytics' }">
        <i class="material-icons md-20">add</i>
      </router-link>
    </div>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../app.scss";
div.admin {
  display: grid;
  grid-template-columns: $bar-height 1fr;

  .sidebar {
    background-color: $primary-color;
    height: 100vh;
    display: block;

    a {
      text-decoration: none;
      color: #fff;
    }
    i {
      padding: 10px;
      margin: ($bar-height - ($bar-height - 10px)) / 2;
      display: block;
      height: $bar-height - 10px;
      width: $bar-height - 10px;
      border-radius: ($bar-height - 10px) / 2;
      &:hover {
        background-color: rgba($primary-color-dark, 0.5);
      }
    }
  }
  .main {
    height: 100vh;
    overflow: auto;
  }
}
</style>
