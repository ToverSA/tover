<template>
    <div class="home" @click="onClickGlobal">
      <app-header/>
      <app-footer/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppHeader from '@/market/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { searchIcon, helpIcon, personOutlineIcon, localAtmIcon } from '@/icons';
@Component({
  components: {
    AppHeader,
    AppFooter,
    searchIcon,
    helpIcon,
    personOutlineIcon,
    localAtmIcon,
  },
})
export default class Home extends Vue {
  public menuOpened: boolean = false;

  public get signedIn(): boolean {
    return this.$store.getters.loggedIn;
  }

  public openMenu(): void {
    this.menuOpened = true;
  }

  public logOut(): void {
    this.$store.commit('signout');
  }

  public onClickGlobal() {
    this.$store.commit('header/closeMenu');
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
</style>
