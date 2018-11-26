<template>
    <div class="home">
      <app-header/>
      <quick-search/>
      <router-view/>
      <!-- <app-footer/> -->
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppHeader from '@/market/components/AppHeader.vue';
import QuickSearch from '@/market/components/QuickSearch.vue';
import AppFooter from '@/components/AppFooter.vue';
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
  }
}
</style>
