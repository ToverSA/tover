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
*{
  box-sizing: border-box;
}

body{
  margin: 0;
  background-color: #EFEFEF;
}
</style>
