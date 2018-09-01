<template>
    <div class="auth">
      <div class="top">
        <button @click="onCancel">
          <icons name="close"/>
        </button>
      </div>
      <app-logo/>
      <form v-if="state === 0">
        <h3>Sign in to your profile</h3>
        <label for="email">Email</label><br>
        <input type="text" name="email">
        <label for="password">Password</label><br>
        <input type="password" name="password">
        <div class="grid-x2">
          <input type="button" value="FORGOT PASSWORD?" class="negative">
          <input @click="signIn" type="button" value="SIGN IN" class="btn-accent">
        </div>
        <input @click="gotoCreate" type="button" value="CREATE AN ACCOUNT" class="negative">
      </form>
      <form v-else-if="state === 1">
        <h3>Sign up for a new profile</h3>
        <label for="names">Names</label><br>
        <input v-validate="'min:3'" v-bind:class="{invalid: isNamesInvalid}" type="text" name="names" placeholder="John Doe" v-model="names">
        <label for="email">Email</label><br>
        <input v-validate="'required|email'" v-bind:class="{invalid: isEmailInvalid}" type="text" name="email" placeholder="john@mail.com" v-model="email">
        <label for="password">Password</label><br>
        <!-- if required => /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$/ -->
        <input 
          v-validate="{ required: true, regex: /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/ }"
          v-bind:class="{invalid: isPasswordInvalid}"
          type="password"
          name="password"
          placeholder="Keep this as a secret"
          v-model="password"
        />
        <div class="grid-x2">
          <input @click="gotoLogin" type="button" value="SIGN IN INSTEAD" class="negative">
          <input @click="signUp" type="button" value="SIGN UP" class="btn-accent">
        </div>
      </form>
      <loader-dialog v-if="loading"/>
      <confirm-dialog
        v-bind:title="errorMessage"
        v-bind:on-positive="{label: 'OK', callback: closeDialog}"
        v-if="isError"
      />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import store from '@/store';
import api from '@/api';
import { Loader, Confirm } from '@/components/dialog';
// import { default as Computed } from '@/decorators';
enum View {
  login,
  signup,
}
@Component({
  components: {
    loaderDialog: Loader,
    confirmDialog: Confirm,
  },
  $_veeValidate: { validator: 'new' },
})
export default class Auth extends Vue {
  public state: number = View.login;
  public names: string = '';
  public email: string = '';
  public password: string = '';
  public authEmail: string = '';
  public authPassword: string = '';
  public loading: string | boolean = false;
  private isError: boolean = false;
  public errorMessage: string = '';

  // @Computed
  get isNamesInvalid() {
    const fields = this.$validator.errors;
    return fields.items.some((item) => {
      return item.field === 'names';
    });
  }

  // @Computed
  get isEmailInvalid() {
    const fields = this.$validator.errors;
    return fields.items.some((item) => {
      return item.field === 'email';
    });
  }

  // @Computed
  get isPasswordInvalid() {
    const fields = this.$validator.errors;
    return fields.items.some((item) => {
      return item.field === 'password';
    });
  }

  public onCancel(): void {
    if (window.history.state === null) {
      this.$router.push({ name: 'home' });
    } else {
      this.$router.go(-1);
    }
  }

  public gotoCreate(): void {
    this.state = View.signup;
  }
  public gotoLogin(): void {
    this.state = View.login;
  }
  public openErrorDialog(error: string): void {
    this.errorMessage = error;
    this.isError = true;
  }

  public closeDialog(): void {
    this.email = '';
    this.password = '';
    this.errorMessage = '';
    this.isError = false;
  }

  private handleNetworkError(error: any): void {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const errors = error.response.data.errors;
      if (status === 400) {
        this.openErrorDialog(errors.title);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  }

  /**
   * sigh up button callback
   */
  public signUp(): void {
    if (this.names.length === 0) {
      return;
    }
    if (this.password.length === 0) {
      return;
    }
    if (this.email.length === 0) {
      return;
    }
    this.loading = 'Signing up';
    api
      .createUser(this.names, this.email, this.password)
      .then((response) => {
        this.signIn();
      })
      .catch((error) => {
        this.loading = false;
        this.handleNetworkError(error);
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
        this.loading = false;
        this.handleNetworkError(error);
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

  .top {
    display: flex;
    justify-content: flex-end;
    padding: 5px;
  }

  .app-logo {
    height: auto;
    display: block;
    width: 80px;
    margin: auto;
  }

  form {
    padding: 10px;
    margin: auto;
    width: 100%;
    max-width: 425px;
    color: white;

    input {
      width: 100%;
      margin: 10px 0;
      padding: 14px 10px;
      font-size: 1em;
      border-radius: 3px;
      border: 0;

      &[type='button'] {
        color: white;
        min-width: 100px;
        &.negative {
          background-color: $primary-color-dark;
          color: white;
        }
      }
      &.invalid {
        border-right: 10px solid rgb(255, 94, 0);
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
