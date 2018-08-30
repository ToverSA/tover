<template>
    <div class="auth">
      <form>
        <h3>Sign in to your Tover profile</h3>
        <label for="email">Email</label><br>
        <input type="text" name="email">
        <label for="password">Password</label><br>
        <input type="password" name="password">
        <div class="grid-x2">
          <input type="button" value="FORGOT PASSWORD?" class="negative">
          <input type="button" value="SIGN IN">
        </div>
        <input type="button" value="CREATE AN ACCOUNT" class="negative">
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
        min-width: 100px;
        &.negative {
          background-color: $primary-color-dark;
          color: white;
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
