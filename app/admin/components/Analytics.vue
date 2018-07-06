<template lang="html">
  <div class="analytics">
    <div class="side">
      <h2>Overview</h2>
      <div class="button">
        <i class="material-icons md-20">donut_large</i>
        <span>Overview</span>
      </div>
      <div class="button">
        <i class="material-icons md-20">search</i>
        <span>Campuses</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../app.scss";
div.analytics {
  .side {
    background-color: $primary-color;
    width: 250px;
    height: 100%;
    padding: 10px;

    h2 {
      color: #fff;
      opacity: 0.5;
    }

    .button {
      color: #fff;
      text-decoration: none;
      padding: 10px;
      display: flex;
      cursor: pointer;
      &:hover {
        background-color: rgba($primary-color-dark, 0.5);
      }

      i {
        padding-right: 5px;
      }
    }
  }
}
</style>
