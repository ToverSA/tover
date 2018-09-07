<template>
    <div class="signup">
      <div class="top">
        <button @click="onCancel" class="btn-round">
          <close-icon/>
        </button>
      </div>
      <app-logo/>
      <div class="form" v-if="step === 1" @submit.prevent>
        <h3>Create an account</h3>
        <div class="content">
          <label for="names">Give your full name</label>
          <input type="text">
          <label for="email">Your email address</label>
          <input type="email" name="email">
        </div>
        <div class="controls">
          <span></span>
          <button @click="nextStep">
            <span>next</span>
            <chevron-right-icon/>
          </button>
        </div>
      </div>
      <div class="form" v-if="step === 2">
        <h3>Create an account</h3>
        <div class="content">
          <label for="password">Choose a strong password</label>
          <input type="password" name="password">
          <label for="password2">Re enter your password</label>
          <input type="password" name="password2">
        </div>
        <div class="controls">
          <button @click="previousStep">
            <chevron-left-icon/>
            <span>back</span>
          </button>
          <button @click="nextStep" class="theme">
            <span>sign up</span>
            <chevron-right-icon/>
          </button>
        </div>
        <!-- TODO terms of signing in here -->
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import store from '@/store';
import api from '@/api';
import { closeIcon, chevronRightIcon, chevronLeftIcon } from '@/icons';

@Component({
  components: {
    closeIcon,
    chevronRightIcon,
    chevronLeftIcon,
  },
})
export default class Signup extends Vue {
  public email: string = '';
  public password: string = '';
  public loading: boolean = false;
  public errorMessage: string = '';
  private isError: boolean = false;
  public step: number = 1;

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

  public nextStep(): void {
    this.step++;
  }

  public previousStep(): void {
    this.step--;
  }

  public closeDialog(): void {
    this.email = '';
    this.password = '';
    this.errorMessage = '';
    this.isError = false;
  }

  public signIn(): void {
    if (this.loading) return;
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
div.signup {
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
    h3 {
      margin: 0;
      padding: 13px;
      color: white;
    }
  }

  .app-logo {
    height: auto;
    display: block;
    width: 80px;
    margin: auto;
  }

  .form {
    padding: 10px;
    margin: 0 auto;
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
      // background-color: rgba($error-color, 0.4);
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
    .controls {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
