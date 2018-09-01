<template>
  <div class="dialog">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.dialog {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.233);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  .container {
    background-color: white;
    position: absolute;
    padding: 20px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    max-width: 425px;
    width: 100%;
    @media screen and (max-width: 425px) {
      bottom: 0;
    }
  }
  &.loader {
    .container {
      display: grid;
      grid-template-columns: 50px 1fr;

      .status {
        margin: 0;
        padding: 14px;
      }
    }
  }
}
</style>
