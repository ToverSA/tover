<template>
    <div class="signup-form">
      <auth-form>
        <h2>Create an account</h2>
        <input
          type="text"
          name="names"
          v-validate="{
            required: true,
            min: 2,
            alpha_spaces: true
          }"
          placeholder="Full names" v-model="names"
          :class="{error: errors.has('names')}">
        <input
          type="text" 
          name="email"
          v-validate="{
            required: true,
            email: true
          }"
          :class="{error: errors.has('email')}"
          placeholder="Email" 
          v-model="email">
        <input
          type="password" 
          placeholder="Password" 
          name="password"
          v-validate="{
            required: true,
            min: 3
          }"
          ref="passwordRef"
          :class="{error: errors.has('password')}"
          v-model="password">
        <input
          type="password"
          placeholder="Repeat password" 
          name="password_confirm"
          v-validate="{
            required: true,
            confirmed: 'passwordRef'
          }"
          :class="{error: errors.has('password_confirm')}"
          v-model="pwd2">
        <div class="auth-buttons">
          <button class="plain" @click="toSignin">
            <span>Signed up already</span>
          </button>
          <button @click="signUp">
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
  $_veeValidate: { validator: 'new' },
})
export default class SignupForm extends Vue {
  @Prop() private onSignin!: () => void;
  @Prop() private onDone!: () => void;


  private loading = false;
  private password = '';
  private pwd2 = '';
  private names = '';
  private email = '';

  private toSignin() {
    this.onSignin();
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
    if (this.email.length === 0) {
      return;
    }
    if (this.$validator.errors.count() > 0) {
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