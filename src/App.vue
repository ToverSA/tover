<template lang="html">
  <div class="main-content">
    <router-view/>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss">
@import './app.scss';

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: $background-color;
  // font-family: "Lato";
  font-family: Arial, Helvetica, sans-serif;
}
.icon {
  svg {
    height: 18px;
    width: 18px;
    fill: white;
    display: inline-block;
  }
}
.btn,
button {
  border: none;
  padding: 10px;
  outline: none;
  display: block;
  background-color: transparent;

  &.btn-responsive {
    @media screen and (max-width: 425px) {
      span {
        display: none;
      }
    }
  }
}
</style>