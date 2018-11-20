<template>
    <div class="signin-form">
      <auth-form>
        <h2>Sign in to your account</h2>
        <input type="text" placeholder="Username" v-model="username">
        <input type="password" placeholder="Password" v-model="password">
        <div class="auth-buttons">
          <button class="borderless">
            <span>forgot password?</span>
          </button>
          <button @click="signIn">
            <span>sign in</span>
          </button>
        </div>
        <button class="borderless" @click="toSignup">
            <span>create an account</span>
        </button>
      </auth-form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import store from '@/store';
import { authUser } from '@/api';
import authForm from '@/auth/components/AuthForm.vue';
import { UserAuth } from '@/store/auth';

@Component({
  components: {
    authForm,
  },
})
export default class SigninForm extends Vue {
  @Prop() private onSignup!: () => void;

  private username: string = '';
  private password: string = '';

  private get loading() {
    return store.getters['auth/authenticating']
  };

  private toSignup() {
    this.onSignup();
  }

  private async signIn(): Promise<any> {
    if (this.loading) { return; }
    const userAuth: UserAuth = {
      username: this.username,
      password: this.password,
      grant_type: 'password'
    }
    try {
      await store.dispatch('auth/authenticate', userAuth);
      const query = this.$route.query;
      if (query.hasOwnProperty('redirect')) {
        this.$router.push(query.redirect);
      } else {
        this.$router.push({ name: 'home' });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
</script>