<template lang="html">
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'from sdun'
    }
  }
}
</script>

<style lang="scss">
@import './app.scss';
@font-face{
  font-family: 'Roboto';
  src: url('./../assets/fonts/RobotoSlab-Regular.ttf');
}
@font-face{
  font-family: 'Roboto Bold';
  src: url('./../assets/fonts/RobotoSlab-Bold.ttf');
}
@font-face{
  font-family: 'Roboto Light';
  src: url('./../assets/fonts/RobotoSlab-Light.ttf');
}
@font-face{
  font-family: 'Roboto Thin';
  src: url('./../assets/fonts/RobotoSlab-Thin.ttf');
}

*{
  box-sizing: border-box;
}

body{
  margin: 0;
  background-color: $background-color;
  font-family: 'Roboto';
}
</style>
