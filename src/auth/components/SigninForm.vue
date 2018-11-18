<template>
    <div class="signin-form">
      <auth-form>
        <h2>Sign in to your account</h2>
        <input type="text" placeholder="Username" v-model="username">
        <input type="password" placeholder="Password" v-model="password">
        <div class="auth-buttons">
          <button class="plain">
            <span>forgot password?</span>
          </button>
          <button @click="signIn">
            <span>sign in</span>
          </button>
        </div>
        <button class="plain" @click="toSignup">
            <span>create an account</span>
        </button>
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
export default class SigninForm extends Vue {
  @Prop() private onSignup!: () => void;

  private username: string = '';
  private password: string = '';

  private loading = false;

  private toSignup() {
    this.onSignup();
  }

  private signIn(): void {
    if (this.loading) { return; }
    this.loading = true;
    api
      .authUser(this.username, this.password)
      .then((response) => {
        this.loading = false;
        const data = response.data;
        const token = data.access_token;
        if (typeof token === 'undefined') {
          return; // TODO something about this error
        }
        store.commit('auth/signin', token);
        const query = this.$route.query;
        if (query.hasOwnProperty('redirect')) {
          this.$router.push(query.redirect);
        } else {
          this.$router.push({ name: 'home' });
        }
      })
      .catch((error) => {
        this.loading = false;
        // TODO handle error of signing in
      });
  }
}
</script>