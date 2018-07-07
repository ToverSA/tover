<template lang="html">
  <div class="dialog-container">
    <div class="dialog-frame">
      <h3 class="title">{{dialogTitle}}</h3>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default { props: ["dialogTitle"] };
</script>

<style lang="scss" scoped>
@import "../../app.scss";
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

    h3.title {
      margin: 10px 0;
    }
    input.dialog-input {
      width: 100%;
      padding: 10px;
      outline: none;
      border: 0;
      font-size: 1em;
      background-color: rgba($primary-color, 0.05);
      border-bottom: 4px solid rgba($primary-color, 0.3);
      margin: 5px 0;
    }
  }
}
</style>
