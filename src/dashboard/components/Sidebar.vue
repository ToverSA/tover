<template>
  <div class="sidebar">
    <h3 class="title">{{title}}</h3>
    <div class="menu-btn" @click="toggleMenu">
      <menu-icon/>
    </div>
    <div class="options" :class="{open: menuOpen}">
      <slot></slot>
      <span @click="logOut">Log out</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import store from '@/store';
import { menuIcon, closeIcon } from '@/icons';

@Component({
  components: {
    menuIcon,
    closeIcon,
  },
})
export default class Sidebar extends Vue {
  @Prop(String) private title!: string;

  private menuOpen = false;

  private toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  private logOut() {
    store.commit('auth/signout');
    this.$router.push({ name: 'home' });
  }
}
</script>
<style lang="scss" scoped>
div.sidebar {
  --header-color: rgba(255, 255, 255, 0.171);
  background-color: var(--primary-color);

  .title {
    background-color: var(--header-color);
    margin: 0;
    padding: 14px;
    color: white;
  }

  svg {
    display: none;
  }

  .options {
    span,
    a {
      display: block;
      padding: 15px;
      color: white;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        background-color: rgba(255, 255, 255, 0.103);
      }
    }
  }

  @media screen and (max-width: 450px) {
    display: flex;
    position: relative;

    .title {
      flex-grow: 1;
    }

    svg {
      --box: 50px;
      height: var(--box);
      width: var(--box);
      padding: 15px;
      display: block;
      background-color: var(--header-color);
    }

    .options {
      position: fixed;
      background-color: var(--primary-color);
      left: 0;
      right: 0;
      bottom: 0;
      top: 50px;
      display: none;

      &.open {
        display: block;
      }
    }
  }
}
</style>
