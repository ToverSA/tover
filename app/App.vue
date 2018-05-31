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
  font-family:OpenSans;
  src:url(./../assets/fonts/OpenSans-Regular.ttf);
}
@font-face {
  font-family:OpenSans Bold;
  src:url(./../assets/fonts/OpenSans-Bold.ttf);
}
@font-face {
  font-family:OpenSans ExtraBold;
  src:url(./../assets/fonts/OpenSans-ExtraBold.ttf);
}
@font-face {
  font-family:OpenSans SemiBold;
  src:url(./../assets/fonts/OpenSans-SemiBold.ttf);
}
@font-face {
  font-family:OpenSans Light;
  src:url(./../assets/fonts/OpenSans-Light.ttf);
}
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
  font-family: 'OpenSans';
}
</style>
