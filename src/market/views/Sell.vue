<template>
  <div class="sell">
    <app-header/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import AppHeader from '@/market/components/AppHeader.vue';

@Component({
  components: { AppHeader },
})
export default class Sell extends Vue {
  @Prop({ default: 'home', type: String })
  public name!: string;
}
</script>

<style lang="scss" scoped>
div.sell {
}
</style>
