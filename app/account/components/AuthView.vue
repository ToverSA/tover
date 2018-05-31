<template lang="html">
  <div>
    <img src="../../../assets/images/tover.png" alt="">
    <form>

    </form>
  </div>
</template>

<script>
export default {
  methods: {
    home: function () {
      this.$router.push({ path : '/'});
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
div{
  background-color: $primary-color;
  height: 100vh;
  padding: 100px;
  @media screen and (max-width: 450px){

  }

  img{
    display: block;
    margin: auto;
    max-width: 200px;
  }
  form{
    max-width: 450px;
    margin: auto;
    background-color: #FFF;
    padding: 15px;
  }
}
</style>
