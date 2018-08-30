<template>
    <div>
      <form>
        <h3>Sign up for a Tover account</h3>
        <label for="names">Names</label><br>
        <input type="text" name="names">
        <label for="email">Email</label><br>
        <input type="email">
        <label for="password">Password</label><br>
        <input type="password">
      </form>
    </div>
</template>
<style lang="scss" scoped>
@import "@/app.scss";
div {
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
    }
  }
}
</style>
