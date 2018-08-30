<template>
    <div class="auth">
      <form>
        <h3>Sign in to your Tover profile</h3>
        <label for="email">Email</label><br>
        <input type="text" name="email">
        <label for="password">Password</label><br>
        <input type="password" name="password">
        <div class="grid-x2">
          <router-link :to="{name: 'accountRecovery'}">forgot password?</router-link>
          <input type="button" value="SIGN IN">
        </div>
        <router-link :to="{name: 'createAccount'}">Create a new account</router-link>
      </form>
    </div>
</template>
<style lang="scss" scoped>
@import "@/app.scss";
div.auth {
  background-color: $primary-color;
  height: 100vh;
  padding-top: 100px;

  form {
    // background-color: white;
    padding: 10px;
    margin: auto;
    width: 100%;
    max-width: 425px;
    color: white;

    input {
      width: 100%;
      margin: 5px 0;
      padding: 10px;
      font-size: 1;
      border-radius: 3px;
      border: 0;

      &[type="button"] {
        background-color: $accent-color;
        color: white;
        width: auto;
        min-width: 100px;
      }
    }
    .grid-x2 {
      display: flex;
      justify-content: space-between;
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
