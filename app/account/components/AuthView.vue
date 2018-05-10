<template lang="html">
  <div class="auth-wrapper">
    <div class="auth">
      <img src="../../../assets/images/Ako.png" alt="Akomo" @click="home()">
      <form class="authForm">
        <label>Hello</label>
      </form>
    </div>
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
.auth-wrapper{
  min-height: 100vh;
  background-color: $auth-color;

  .auth{
    display: none;
    display: grid;
    grid-template-columns: 1fr 500px 1fr;
    padding-top: 50px;

    @media screen and (max-width: 1024px){
      grid-template-columns: 1fr 300px 1fr;
    }

    img{
      width: 100%;
      height: 200px;
      grid-column: 2 / 3;
      object-fit: contain;
      cursor: pointer;
    }

    form{
      background-color: #FFF;
      grid-column: 2 / 3;
      padding: 20px;
    }
  }
}
</style>
