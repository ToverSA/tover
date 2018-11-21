<template>
    <div class="auth">
      <signin-form :on-signup="gotoSignup" v-if="signingIn"/>
      <signup-form :on-signin="gotoSignin" v-else/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import signupForm from '@/auth/components/SignupForm.vue';
import signinForm from '@/auth/components/SigninForm.vue';

@Component({
  components: {
    signinForm,
    signupForm,
  },
})
export default class Auth extends Vue {

  private signingIn: boolean = false;

  public gotoSignin() {
    this.signingIn = true;
  }

  public gotoSignup() {
    this.signingIn = false;
  }

  public onCancel(): void {
    if (window.history.state === null) {
      this.$router.push({ name: 'home' });
    } else {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
div.auth {
  background-color: $background-color;
  // background-color: var(--primary-color);
  height: 100%;
  min-height: 100vh;
  padding-top: 50px;

  @media screen and (max-width: 450px) {
    padding-top: 0;
  }
}
</style>
