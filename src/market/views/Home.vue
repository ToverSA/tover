<template>
    <div class="home" @click="onClickGlobal">
      <app-header/>
      <quick-search/>
      <router-view/>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppHeader from '@/market/components/AppHeader.vue';
import QuickSearch from '@/market/components/QuickSearch.vue';
import AppFooter from '@/components/AppFooter.vue';
import { getProfile } from '@/api';
import { searchIcon, categoryIcon } from '@/icons';
@Component({
  components: {
    AppHeader,
    AppFooter,
    searchIcon,
    categoryIcon,
    QuickSearch,
  },
})
export default class Home extends Vue {
  private menuOpened: boolean = false;

  private created() {
    if (this.signedIn) {
      const token = this.$store.getters.token;
      getProfile(token).then((response) => {
        this.$store.commit('profile', response.data);
      });
    }
  }

  private get signedIn(): boolean {
    return this.$store.getters.loggedIn;
  }

  private openMenu(): void {
    this.menuOpened = true;
  }

  private logOut(): void {
    this.$store.commit('signout');
  }

  private onClickGlobal() {
    this.$store.commit('header/closeMenu');
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
div.home {
  > header {
    margin-bottom: 67px;
  }

  overflow-x: hidden;

  @media screen and (max-width: 450px) {
    .quick-search {
      .suggest {
        left: 5px;
        right: 5px;
        transform: none;
        width: auto;
      }
    }
  }
}
</style>
