<template>
    <div class="auth">
      <router-link :to="{name: 'home'}">
        <i class="material-icons close">close</i>
      </router-link>
      <img src="@/assets/img/tover.png" alt="Tover logo" class="logo">
      <form v-if="state === 0">
        <h3>Sign in to your profile</h3>
        <label for="email">Email</label><br>
        <input type="text" name="email">
        <label for="password">Password</label><br>
        <input type="password" name="password">
        <div class="grid-x2">
          <input type="button" value="FORGOT PASSWORD?" class="negative">
          <input @click="signIn" type="button" value="SIGN IN">
        </div>
        <input @click="gotoCreate" type="button" value="CREATE AN ACCOUNT" class="negative">
      </form>
      <form v-else-if="state === 1">
        <h3>Sign up for a new profile</h3>
        <label for="names">Names</label><br>
        <input type="text" name="names" placeholder="John Doe" v-model="names">
        <label for="email">Email</label><br>
        <input type="text" name="email" placeholder="john@mail.com" v-model="email">
        <label for="password">Password</label><br>
        <input type="password" name="password" placeholder="Keep this as a secret" v-model="password">
        <div class="grid-x2">
          <input @click="gotoLogin" type="button" value="ALREADY HAVE ACCOUNT?" class="negative">
          <input @click="signUp" type="button" value="SIGN UP">
        </div>
      </form>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import api from '@/api';
enum View {
  login,
  signup,
  loading,
}
@Component
export default class Auth extends Vue {
  public state: number = View.login;
  public names: string = '';
  public email: string = '';
  public password: string = '';
  public authEmail: string = '';
  public authPassword: string = '';

  public gotoCreate(): void {
    this.state = View.signup;
  }
  public gotoLogin(): void {
    this.state = View.login;
  }
  /**
   * sigh up button callback
   */
  public signUp(): void {
    this.state = View.loading;
    api
      .createUser(this.names, this.email, this.password)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        //TODO catch error
      })
      .finally(() => {
        this.state = View.login;
      });
  }
  public signIn(): void {
    console.log('signing in');
    api.authUser(this.authEmail, this.authPassword);
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
div.auth {
  background-color: $primary-color;
  height: 100vh;

  i {
    height: $bar-height;
    width: $bar-height;
    padding: 14px;
    color: white;
  }

  .logo {
    height: auto;
    display: block;
    width: 300px;
    margin: auto;
  }

  form {
    // background-color: white;
    padding: 10px;
    margin: auto;
    width: 100%;
    max-width: 425px;
    color: white;

    input {
      width: 100%;
      margin: 5px 0;
      padding: 10px;
      font-size: 1;
      border-radius: 3px;
      border: 0;

      &[type='button'] {
        background-color: $accent-color;
        color: white;
        min-width: 100px;
        &.negative {
          background-color: $primary-color-dark;
          color: white;
        }
      }
    }
    .grid-x2 {
      display: flex;
      justify-content: space-between;

      input {
        width: auto;
      }
    }
    a {
      padding: 10px 0px;
      color: $accent-color;
      text-align: center;
      display: block;
    }
  }
}
</style>
