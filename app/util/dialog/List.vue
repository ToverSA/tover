<template lang="html">
  <div class="dialog-list">
    <span v-for="i in list">{{i}}</span>
  </div>
</template>

<script>
export default { props: ["list"] };
</script>

<style lang="scss" scoped>
div.dialog-list {
  display: grid;
  grid-row-gap: 2px;

  span {
    display: block;
    padding: 10px 0;
  }
}
</style>
