<template>
  <div class="sell">
    Sell
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Sell extends Vue {
  @Prop({ default: 'home', type: String })
  public name!: string;
}
</script>
