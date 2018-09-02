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

body {
  background-color: $background-color;
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
  color: white;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

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
  &.btn-accent-alpha {
    background-color: rgba($accent-color, 0.1);
    color: $accent-color;
  }

  &:focus {
    box-shadow: 0 0 1px 1px rgba($accent-color, 0.2);
  }
  &:hover {
    background-color: $primary-color-dark;
    &.btn-accent-alpha {
      background-color: rgba($accent-color, 0.4);
    }
  }
  &:active {
    background-color: rgba($primary-color-dark, 0.3);
    &.btn-accent-alpha {
      background-color: rgba($accent-color, 0.05);
    }
  }
  &.btn-accent {
    background-color: $accent-color;
  }
  &.btn-accent-plain {
    color: $accent-color;
    background-color: rgba(255, 255, 255, 0.377);
  }
  &.btn-rounded {
    border-radius: 3px;
  }
  &.btn-plain {
    background-color: white;
    color: $primary-color;

    span {
      color: $primary-color;
    }
    .icon svg,
    svg {
      fill: $primary-color;
    }
  }
}
</style>