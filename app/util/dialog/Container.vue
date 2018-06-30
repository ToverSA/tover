<template lang="html">
  <div class="dialog-container">
    <div class="dialog-frame">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
div.dialog-container {
  background-color: rgba(#000, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  .dialog-frame {
    position: absolute;
    background-color: #fff;
    color: #000;
    padding: 5px;
    width: 100%;
    left: 50%;
    transform: translate(-50%);
    top: 150px;
    max-width: 600px;
    padding: 50px 70px;
    border-radius: 5px;
    @media screen and (max-width: 768px) {
      top: 100px;
      max-width: 450px;
      padding: 20px 40px;
    }
    @media screen and (max-width: 450px) {
      top: auto;
      transform: none;
      left: 0;
      bottom: 0;
      padding: 15px;
      border-radius: 0;
    }
  }
}
</style>
