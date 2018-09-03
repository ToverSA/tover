<template>
  <div class="profile">
    <app-header/>
    <div class="section">
      <h3>Personal details</h3>
      <form class="sub">
        <label for="image">Avatar</label>
        <img src="@/assets/clear.gif" alt="avatar">
        <button class="theme">
          <edit-icon/>
        </button>
      </form>
    </div>
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
  background-color: $primary-color;
  > button {
    margin: 5px auto;
    margin-right: 0;
    display: block;
  }
  .section {
    background-color: white;
    max-width: 768px;
    margin: auto;
    padding: 10px;

    h3 {
      color: #546e7a;
    }
  }
}
</style>
