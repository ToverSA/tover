<template>
    <div class="signup-form">
      <auth-form>
        <h2>Create an account</h2>
        <input
          @blur="touch('names')"
          type="text"
          name="names"
          placeholder="Full names" v-model="names"
          :class="{error: !namesValid}">
        <input
          type="text" 
          name="email"
          @blur="touch('email')"
          :class="{error: !emailValid}"
          placeholder="Email" 
          v-model="email">
        <input
          type="password"
          @blur="touch('password')"
          placeholder="Password" 
          name="password"
          :class="{error: !passwordValid}"
          v-model="password">
        <input
          type="password"
          placeholder="Repeat password" 
          name="password_confirm"
          @blur="touch('password_confirm')"
          :class="{error: !passwordConfirmed}"
          v-model="pwd2">
        <div class="auth-buttons">
          <button class="borderless" @click="toSignin">
            <span>Signed up already</span>
          </button>
          <button @click="signUp" :disabled="empty.length !== 0">
            <span>sign up</span>
          </button>
        </div>
      </auth-form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import store from '@/store';
import { createUser } from '@/api';
import authForm from '@/auth/components/AuthForm.vue';

@Component({
  components: {
    authForm,
  },
})
export default class SignupForm extends Vue {
  @Prop() private onSignin!: () => void;
  @Prop() private onDone!: () => void;


  private loading = false;
  private validate = false;
  private dirty: string[] = [];
  private password = '';
  private pwd2 = '';
  private names = '';
  private email = '';

  private toSignin() {
    this.onSignin();
  }

  private touch(item: string) {
    this.validate = true;
    if (!this.dirty.includes(item)) {
      this.dirty.push(item);
    }
  }

  private get empty(): string[] {
    const field: string[] = [];
    if (this.names.length === 0) {
      field.push('names');
    }
    if (this.email.length === 0) {
      field.push('email');
    }
    if (this.password.length === 0) {
      field.push('password');
    }
    if (this.pwd2.length === 0) {
      field.push('password_confirm');
    }
    return field;
  }

  private get errors(): string[] {
    const field: string[] = [];
    if (!this.namesValid) {
      field.push('names');
    }
    if (!this.emailValid) {
      field.push('email');
    }
    if (!this.passwordValid) {
      field.push('password');
    }
    if (!this.passwordConfirmed) {
      field.push('password_confirm');
    }
    return field;
  }

  private get namesValid() {
    if (this.dirty.includes('names')) {
      const valid = /^(.)[^\~%&`]{1,63}$/.test(this.names);
      if (valid) {
        this.dirty.splice(this.dirty.indexOf('names'));
      }
      return valid;
    }
    return true;
  }

  private get emailValid() {
    if (this.dirty.includes('email')) {
      const valid = /^([\w\.]+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6}){1,2})$/.test(this.email);
      if (valid) {
        this.dirty.splice(this.dirty.indexOf('email'));
      }
      return valid;
    }
    return true;
  }
  /**
   * checks if password is valid
   * @returns boolean true if field is not touched or if passes regex | false if fails regex
   */
  private get passwordValid() {
    if (this.dirty.includes('password')) {
      return /\S{3,}$/.test(this.password);
    }
    return true;
  }

  private get passwordConfirmed() {
    if (this.dirty.includes('password_confirm')) {
      return this.password === this.pwd2;
    }
    return true;
  }

  private handleNetworkError(error: any): void {
    this.loading = false;
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

  private signUp(): void {
    if (this.loading) {
      return;
    }
    if (this.empty.length !== 0) {
      return;
    }
    if (this.errors.length !== 0) {
      return;
    }
    this.loading = true;
    createUser(this.names, this.email, this.password)
      .then((response) => {
        this.toSignin();
      })
      .catch(this.handleNetworkError);
  }
}
</script>