<template>
  <div class="profile">
    Profile
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Profile extends Vue {
  @Prop({ default: 'home', type: String })
  public name!: string;
}
</script>
