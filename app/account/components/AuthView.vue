<template lang="html">
  <div class="auth">
    <form>
      <img src="../../../assets/images/tover-black.png" alt="">
      <h3>Login to your account</h3>
      <input type="text" placeholder="Username">
      <input type="password" placeholder="Password">
      <div class="buttons">
        <div class="button">
          <span>Forgot password?</span>
        </div>
        <div class="button theme">
          <span>LOGIN</span>
        </div>
      </div>
      <div class="buttons">
        <div class="button">
          <span>Already have an account?</span>
        </div>
      </div>
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
div.auth{
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
    padding: 20px;

    input{
      width: 100%;
      margin: 5px 0;
      font-size: 1em;
      padding: 10px;
      border: 0;
      background-color: $primary-color + unquote("1f");
    }
    .buttons{
      display: flex;
      justify-content: flex-end;
      margin: 5px 0;
    }
    .button{
      padding: 10px;
    }
  }
}
</style>
