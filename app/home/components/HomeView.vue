<template lang="html">
  <div>
    <h1>Hello</h1>
    <p>This is a demo string</p>
  </div>
</template>

<script>
import HomeHeader from './HomeHeader'
import HomeFooter from './HomeFooter'
export default {
  components: { HomeHeader, HomeFooter }
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';

div{
  background-color: $primary-color;
  padding: 100px;
}

</style>
