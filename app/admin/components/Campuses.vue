<template lang="html">
  <div class="campus-list">
    <div class="campus-item heading">
      <span class="name">Campus</span>
      <span class="adverts">Adverts</span>
    </div>
    <div class="campus-item">
      <div class="name">
        <span class="campus">KwaDlangezwa Campus</span>
        <span class="institution">University Of Zululand</span>
      </div>
      <span class="adverts">654231</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
div.campus-list {
  .campus-item {
    background-color: #fff;
    margin: 2px 5px;
    padding: 5px;
    display: grid;
    grid-template-columns: 4fr 1fr;

    .name {
      display: grid;
      padding-left: 10px;

      span {
        &.campus {
          font-family: Lato Bold;
        }
        &.institution {
          opacity: 0.6;
        }
      }
    }
  }
}
</style>
