<template lang="html">
  <router-view/>
</template>

<script>
export default {};
</script>
<style lang="scss">
@import './app.scss';
@keyframes placeholderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}
:root {
  --primary-color: #ffa000;
  --primary-color-dark: #ff6f00;
  --primary-color-light: #ffca28;
  --primary-color-hover: #fff8e1;
  --primary-color-header: #ffecb3;
  --accent-color: #ff5722;
  --secondary-color: #efd;
  --background-color: #eceff1;
}
body {
  background-color: $background-color;
}

.shine {
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 600px;
  display: inline-block;
  position: relative;

  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeholderShimmer;
  animation-timing-function: linear;
}
a {
  color: var(--primary-color);
}

.btn,
.button,
button,
input[type='button'] {
  border: none;
  margin: 5px;
  padding: 0 10px;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  background-color: var(--primary-color);
  color: white;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-weight: bold;
  text-align: center;
  border-radius: 3px;
  text-transform: uppercase;
  display: inline-flex;
  justify-content: center;
  text-decoration: none;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.158);

  span {
    text-align: center;
    display: inline-block;
    margin: 7px 5px;
    padding: 1px 0;
  }

  > svg {
    height: 28px;
    width: 28px;
    min-height: 28px;
    min-width: 28px;
    display: block;
    padding: 0;
    margin: 5px 0;
  }

  &:focus,
  &:hover {
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.288);
  }
  &:active {
    background-color: var(--primary-color-light);
  }

  @media screen and (max-width: 768px) {
    cursor: default;
  }
}
</style>