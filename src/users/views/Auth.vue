<template>
    <div class="auth">
      <router-link :to="{name: 'home'}">
        <i class="material-icons close">close</i>
      </router-link>
      <app-logo/>
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
          <input @click="gotoLogin" type="button" value="SIGN IN INSTEAD" class="negative">
          <input @click="signUp" type="button" value="SIGN UP">
        </div>
      </form>
      <loader-dialog v-if="loading" v-bind:title="loading"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import store from '@/store';
import api from '@/api';
import LoaderDialog from '@/components/LoaderDialog.vue';
enum View {
  login,
  signup,
}
@Component({
  components: { LoaderDialog },
})
export default class Auth extends Vue {
  public state: number = View.login;
  public names: string = '';
  public email: string = '';
  public password: string = '';
  public authEmail: string = '';
  public authPassword: string = '';
  public loading: string | boolean = false;

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
    this.loading = 'Signing up';
    api
      .createUser(this.names, this.email, this.password)
      .then((response) => {
        // TODO implement what happenes here
      })
      .catch((error) => {
        // TODO catch error
      })
      .finally(() => {
        this.loading = false;
      });
  }
  public signIn(): void {
    this.loading = 'Signing in';
    api
      .authUser(this.authEmail, this.authPassword)
      .then((response) => {
        const data = response.data;
        const token = data.access_token;
        if (typeof token === 'undefined') {
          return; // TODO something about this error
        }
        this.$store.commit('token', token);
        const query = this.$route.query;
        if (query.hasOwnProperty('redirect')) {
          this.$router.push(query.redirect);
        }
      })
      .catch((error) => {
        // TODO handle errors here
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
div.auth {
  background-color: $primary-color;
  height: 100%;
  min-height: 100vh;

  i {
    height: $bar-height;
    width: $bar-height;
    padding: 14px;
    color: white;
  }

  .app-logo {
    height: auto;
    display: block;
    width: 80px;
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
      padding: 14px 10px;
      font-size: 1em;
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
