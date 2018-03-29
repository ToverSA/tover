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
@font-face{
  font-family: 'Roboto';
  src: url('./../assets/RobotoSlab-Regular.ttf');
}
@font-face{
  font-family: 'Roboto Bold';
  src: url('./../assets/RobotoSlab-Bold.ttf');
}
@font-face{
  font-family: 'Roboto Light';
  src: url('./../assets/RobotoSlab-Light.ttf');
}
@font-face{
  font-family: 'Roboto Thin';
  src: url('./../assets/RobotoSlab-Thin.ttf');
}
*{
  box-sizing: border-box;
}

body{
  margin: 0;
  background-color: #EFEFEF;
  font-family: 'Roboto';
}
</style>
