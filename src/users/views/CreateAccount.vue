<template>
    <div class="create">
      <form>
        <h3>Sign up for a Tover account</h3>
        <label for="names">Names</label><br>
        <input type="text" name="names">
        <label for="email">Email</label><br>
        <input type="email">
        <label for="password">Password</label><br>
        <input type="password">
        <div class="grid-x2">
          <router-link :to="{name: 'auth'}">Already have an account?</router-link>
          <input @click="onSignup" type="button" value="SIGN UP">
        </div>
      </form>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class CreateAccount extends Vue {
  onSignup(): void {
    console.log("on sign up pressed");
  }
}
</script>

<style lang="scss" scoped>
@import "@/app.scss";
div.create {
  background-color: $primary-color;
  height: 100vh;
  padding-top: 100px;

  form {
    max-width: 425px;
    margin: auto;
    padding: 10px;
    color: white;

    input {
      width: 100%;
      margin: 5px 0;
      padding: 10px;
      font-size: 1em;
      border-radius: 3px;
      border: 0px;

      &[type="button"] {
        width: auto;
        min-width: 100px;
        background-color: $accent-color;
        color: white;
      }
    }
    .grid-x2 {
      display: flex;
      justify-content: space-between;
    }

    a {
      display: block;
      padding: 10px 0;
      color: $accent-color;
    }
  }
}
</style>
