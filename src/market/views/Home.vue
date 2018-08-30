<template>
    <div>
      <header>
        <img src="@/assets/img/tover.png" alt="Tover logo">
        <nav>
          <router-link to='/account'>SIGN IN</router-link>
        </nav>
      </header>
    </div>
</template>
<style lang="scss" scoped>
@import "@/app.scss";
header {
  height: $bar-height;
  background-color: $primary-color;
  display: flex;
  justify-content: space-between;

  img {
    height: 100%;
  }

  nav {
    padding: 15px;

    a {
      text-decoration: none;
      color: white;
      padding: 5px;
    }
  }
}
</style>
