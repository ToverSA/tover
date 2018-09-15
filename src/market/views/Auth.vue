<template>
    <div class="auth">
      <div class="top">
        <button @click="onCancel" class="btn-round">
          <close-icon/>
        </button>
      </div>
      <app-logo/>
      <form>
        <h3>Sign in to your profile</h3>
        <label for="email">Email</label><br>
        <input v-model="email" type="text" name="email">
        <label for="password">Password</label><br>
        <input v-model="password" type="password" name="password">
        <div class="grid-x2">
          <input type="button" value="forgot password?" class="secondary">
          <input @click="signIn" type="button" value="sign in"
            v-bind:class="{loading: loading}">
        </div>
        <input @click="gotoCreate" type="button"
          value="create an account"
          class="secondary">
      </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import store from '@/store';
import api from '@/api';
import { closeIcon } from '@/icons';
import { loadavg } from 'os';

@Component({
  components: {
    closeIcon,
  },
})
export default class Auth extends Vue {
  public email: string = '';
  public password: string = '';
  public loading: boolean = false;
  public errorMessage: string = '';
  private isError: boolean = false;

  public gotoCreate() {
    this.$router.push({ name: 'signup' });
  }

  public onCancel(): void {
    if (window.history.state === null) {
      this.$router.push({ name: 'home' });
    } else {
      this.$router.go(-1);
    }
  }

  public closeDialog(): void {
    this.email = '';
    this.password = '';
    this.errorMessage = '';
    this.isError = false;
  }

  public signIn(): void {
    if (this.loading) { return; }
    this.loading = true;
    api
      .authUser(this.email, this.password)
      .then((response) => {
        this.loading = false;
        const data = response.data;
        const token = data.access_token;
        if (typeof token === 'undefined') {
          return; // TODO something about this error
        }
        this.$store.commit('token', token);
        const query = this.$route.query;
        if (query.hasOwnProperty('redirect')) {
          this.$router.push(query.redirect);
        } else {
          this.$router.push({ name: 'home' });
        }
      })
      .catch((error) => {
        this.loading = false;
        this.handleNetworkError(error);
      });
  }

  private handleNetworkError(error: any): void {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const errors = error.response.data.errors;
      if (status === 400) {
        // TODO handle error
        return;
      }
      // TODO
    } else {
      // TODO
    }
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

    button {
      min-width: auto;
      padding: 0 5px;
    }
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
      border-radius: 5px;
      border: 0;
      background-color: rgba($primary-color-light, 0.2);
      color: white;
      outline: none;
      &:focus {
        background-color: rgba($primary-color-light, 0.4);
        box-shadow: 0 0 1px 1px $primary-color-dark;
      }
      &[type='button'] {
        background-color: white;
        color: $primary-color-dark;
        padding-bottom: 12px;

        &.secondary {
          background-color: $primary-color;
          color: white;
          text-transform: capitalize;
        }
        &.loading {
          background-color: $primary-color-dark;
          color: $primary-color;
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
