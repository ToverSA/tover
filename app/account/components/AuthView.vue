<template lang="html">
  <div class="auth">
    <form>
      <img src="../../../assets/images/tover-indigo.png" alt="Tover logo" @click="gotoHome()">
      <template v-if="auth == 'login'">
        <h3>Login to your account</h3>
        <input type="email" placeholder="Email address">
        <input type="password" placeholder="Password">
        <div class="buttons">
          <div class="button" @click="auth = 'reset'">
            <span>Forgot password?</span>
          </div>
          <div class="button theme" @click="logIn()">
            <span>LOGIN</span>
          </div>
        </div>
        <div class="buttons">
          <div class="button" @click="auth = 'create'">
            <span>Dont have an account?</span>
          </div>
        </div>
      </template>
      <template v-else-if="auth == 'create'">
        <h3>Create a new account</h3>
        <input type="text" placeholder="Your name" :value="name">
        <input type="email" placeholder="Your email address" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <input type="password" placeholder="Re-enter password" v-model="repassword">
        <div class="buttons">
          <div class="button" @click="auth = 'login'">
            <span>Already have an account?</span>
          </div>
          <div class="button theme" @click="signUp()">
            <span>SIGN UP</span>
          </div>
        </div>
      </template>
      <template v-else>
        <h3>To change your password, an a link to reset your password will be
           sent to your email address</h3>
        <input type="email" placeholder="Enter your email address">
        <div class="buttons">
          <div class="button" @click="auth = 'login'">
            <span>Go to login</span>
          </div>
          <div class="button theme">
            <span>RESET</span>
          </div>
        </div>
      </template>
    </form>
  </div>
</template>

<script>
import api from '../../../api';
export default {
  data () {
    return {
      auth: 'create',
      name: 'Sduduzo Gumede',
      email: 'foo@bar.com',
      password: 'rootuser',
      repassword: 'rootuser'
    }
  },
  methods: {
    logIn () {
      console.log("logging in");
    },
    signUp () {
      console.log(api);
    },
    gotoHome () {
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
div.auth{
  background-color: $primary-color;
  min-height: 100vh;
  padding: 100px;
  @media screen and (max-width: 768px){
    padding: 50px;
  }
  @media screen and (max-width: 450px){
    padding: 0;

    form{
      height: 100vh;
    }
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
