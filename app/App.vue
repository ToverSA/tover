<template lang="html">
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import './app.scss';

@font-face {
  font-family: Lato;
  src:url(./../assets/fonts/Lato-Regular.ttf);
}
@font-face {
  font-family: Lato Light;
  src:url(./../assets/fonts/Lato-Light.ttf);
}

*{
  box-sizing: border-box;
}

body{
  margin: 0;
  background-color: $background-color;
  font-family: 'Lato';
}
</style>
