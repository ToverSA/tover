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

.btn,
.button,
button,
input[type='button'] {
  border: none;
  padding: 10px;
  outline: none;
  display: flex;
  font-size: 1em;
  cursor: pointer;
  background-color: $primary-color;

  > svg {
    height: 20px;
    width: 20px;
    fill: white;
    display: inline-block;
    margin: 5px;
  }
  .icon {
    svg {
      height: 18px;
      width: 18px;
      fill: white;
      display: inline-block;
    }
  }

  &:hover {
    background-color: $primary-color-dark;
  }
  &:active {
    background-color: rgba($primary-color-dark, 0.3);
  }
  &.btn-accent {
    background-color: $accent-color;
  }
  &.btn-plain {
    background-color: transparent;
    color: $primary-color;

    span {
      color: $primary-color;
    }
    .icon svg,
    svg {
      fill: $primary-color;
    }
    &:hover {
      background-color: #eceff1;
    }
    &:active {
      background-color: $primary-color-light;
    }
  }
}
</style>