<template>
    <div class="signup-form">
      <auth-form>
        <h2>Create an account</h2>
        <input type="text" placeholder="Full names" v-model="names">
        <input type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <input type="password" placeholder="Repeat password" v-model="pwd2">
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
import api from '@/api';
import authForm from '@/auth/components/AuthForm.vue';

@Component({
  components: {
    authForm,
  },
})
export default class SignupForm extends Vue {
  @Prop() private onSignin!: () => void;

  private loading = false;
  private password = '';
  private pwd2 = '';
  private names = '';
  private email = '';

  private toSignin() {
    this.onSignin();
  }

  private isNameValid(name: string): boolean {
    return /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(name);
  }
  private isEmailValid(email: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email,
    );
  }
  private isPasswordValid(password: string): boolean {
    return /^(?=.{3,})/.test(password);
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

  private signUp(): void {
    if (this.loading) {
      return;
    }
    if (!this.isPasswordValid(this.password)) {
      return;
    }
    if (this.password !== this.pwd2) {
      return;
    }
    this.loading = true;
    api
      .createUser(this.names, this.email, this.password)
      .then((response) => {
        this.$router.push({ name: 'auth' });
      })
      .catch(this.handleNetworkError);
  }
}
</script>