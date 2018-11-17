<template>
  <div class="profile">
    <app-header/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import AppHeader from '@/market/components/AppHeader.vue';
import { editIcon } from '@/icons';

@Component({ components: { AppHeader, editIcon } })
export default class Profile extends Vue {
  @Prop({ default: 'home', type: String })
  public name!: string;
  public goBack(): void {
    // this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
div.profile {
  @media screen and (max-width: 450px) {
  }
}
</style>
