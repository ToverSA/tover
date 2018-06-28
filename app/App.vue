<template lang="html">
  <div class="main-content">
    <router-view/>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "./app.scss";

@font-face {
  font-family: OpenSans Bold;
  src: url(./../assets/fonts/OpenSans-Bold.ttf);
}

@font-face {
  font-family: Lato;
  src: url(./../assets/fonts/Lato-Regular.ttf);
}
@font-face {
  font-family: Lato Bold;
  src: url(./../assets/fonts/Lato-Bold.ttf);
}
@font-face {
  font-family: Lato Light;
  src: url(./../assets/fonts/Lato-Hairline.ttf);
}
@font-face {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: 400;
  src: url(../assets/fonts/MaterialIcons-Regular.eot); /* For IE6-8 */
  src: url(../assets/fonts/MaterialIcons-Regular.woff) format("woff"),
    url(../assets/fonts/MaterialIcons-Regular.ttf) format("truetype");
}
.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px; /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
}
/* Rules for sizing the icon. */
.material-icons.md-18 {
  font-size: 18px;
}
.material-icons.md-24 {
  font-size: 24px;
}
.material-icons.md-36 {
  font-size: 36px;
}
.material-icons.md-48 {
  font-size: 48px;
}
.material-icons.md-60 {
  font-size: 60px;
}
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: $background-color;
  font-family: "Lato";
}
</style>
